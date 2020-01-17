package com.gpower.common.utils;

import net.iharder.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.StringTokenizer;
import java.util.Vector;

public class FileUtil {

    public static void deleteFile(File file) {
        if (file != null && file.exists()) {
            file.delete();
        }
    }

    public static void encodeStringToFile(String data, String filename)
            throws Exception {
        byte[] bytes = Base64.decode(data);
        writeFile(filename, bytes);
    }

    public static String fileToEncodeString(String filename)
            throws Exception {
        File file = new File(filename);
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));

        int bytes = (int) file.length();
        byte[] buffer = new byte[bytes];
        bis.close();

        String strRet = Base64.encodeBytes(buffer);
        return strRet;
    }

    public static void copyDirectory(File srcDir, File destDir, String excludeDir, String excludeFile)
            throws IOException {
        if (destDir.exists()) {
            if (!destDir.isDirectory()) {
                throw new IOException("Destination '" + destDir + "' exists but is not a directory");
            }
        } else {
            if (!destDir.mkdirs()) {
                throw new IOException("Destination '" + destDir + "' directory cannot be created");
            }
            destDir.setLastModified(srcDir.lastModified());
        }
        if (!destDir.canWrite()) {
            throw new IOException("Destination '" + destDir + "' cannot be written to");
        }
        File[] files = srcDir.listFiles();
        if (files == null) {
            throw new IOException("Failed to list contents of " + srcDir);
        }
        for (int i = 0; i < files.length; i++) {
            File copiedFile = new File(destDir, files[i].getName());
            if (files[i].isDirectory()) {
                if ((excludeDir == null) || (!files[i].getName().equals(excludeDir))) {
                    FileUtils.copyDirectory(files[i], copiedFile);
                }
            } else if ((excludeFile == null) || (!files[i].getName().equals(excludeFile))) {
                FileUtils.copyFile(files[i], copiedFile);
            }
        }
    }

    public static void copyFile(File from, File to)
            throws IOException {
        BufferedInputStream in = null;
        BufferedOutputStream out = null;
        try {
            in = new BufferedInputStream(new FileInputStream(from));
        } catch (IOException ex) {
            throw new IOException("FileUtil.copyFile: opening input stream '" + from.getPath() + "', " + ex.getMessage());
        }
        try {
            out = new BufferedOutputStream(new FileOutputStream(to));
        } catch (Exception ex) {
            try {
                in.close();
            } catch (IOException ex1) {
            }
            throw new IOException("FileUtil.copyFile: opening output stream '" + to.getPath() + "', " + ex.getMessage());
        }
        byte[] buffer = new byte[8192];
        long fileSize = from.length();
        for (long length = fileSize; length > 0L; ) {
            int bytes = (int) (length > 8192L ? 8192L : length);
            try {
                bytes = in.read(buffer, 0, bytes);
            } catch (IOException ex) {
                try {
                    in.close();
                    out.close();
                } catch (IOException ex1) {
                }
                throw new IOException("FileUtil.copyFile: reading input stream, " + ex.getMessage());
            }
            if (bytes >= 0) {
                length -= bytes;
                try {
                    out.write(buffer, 0, bytes);
                } catch (IOException ex) {
                    try {
                        in.close();
                        out.close();
                    } catch (IOException ex1) {
                    }
                    throw new IOException("FileUtil.copyFile: writing output stream, " + ex.getMessage());
                }
            }
        }
        try {
            in.close();
            out.close();
        } catch (IOException ex) {
            throw new IOException("FileUtil.copyFile: closing file streams, " + ex.getMessage());
        }
    }

    public static boolean fileEqualsExtension(String fileName, String extension) {
        boolean result = false;

        int fnLen = fileName.length();
        int exLen = extension.length();
        if (fnLen > exLen) {
            String fileSuffix = fileName.substring(fnLen - exLen);
            if (caseSensitivePathNames()) {
                result = fileSuffix.equals(extension);
            } else {
                result = fileSuffix.equalsIgnoreCase(extension);
            }
        }
        return result;
    }

    public static boolean caseSensitivePathNames() {
        boolean result = true;

        String osname = System.getProperty("os.name");
        if (osname != null) {
            if (osname.startsWith("macos")) {
                result = false;
            } else if (osname.startsWith("Windows")) {
                result = false;
            }
        }
        return result;
    }

    public static void storeFile(MultipartFile file, File destFile) throws IllegalStateException, IOException{
        if(!destFile.getParentFile().exists()){
            destFile.getParentFile().mkdirs();
        }
        file.transferTo(destFile);
    }
    public static boolean isPatternString(String pattern) {
        if (pattern.indexOf("*") >= 0) {
            return true;
        }
        if (pattern.indexOf("?") >= 0) {
            return true;
        }
        int index = pattern.indexOf("[");
        if ((index >= 0) && (pattern.indexOf("]") > index + 1)) {
            return true;
        }
        return false;
    }

    public static boolean matchPattern(String fileName, String pattern) {
        return recurseMatchPattern(fileName, pattern, 0, 0);
    }

    public static String getUserHomeDirectory() {
        String userDirName = System.getProperty("user.home", null);
        if (userDirName == null) {
            userDirName = System.getProperty("user.dir", null);
        }
        return userDirName;
    }

    public static String find(String f) {
        String path = (String) System.getProperties().get("user.dir");
        String sep = (String) System.getProperties().get("file.separator");
        path = path + sep;
        path = path + f;
        return path;
    }

    private static boolean recurseMatchPattern(String string, String pattern, int sIdx, int pIdx) {
        int pLen = pattern.length();
        int sLen = string.length();
        for (; ; ) {
            if (pIdx >= pLen) {
                if (sIdx >= sLen) {
                    return true;
                }
                return false;
            }
            if ((sIdx >= sLen) && (pattern.charAt(pIdx) != '*')) {
                return false;
            }
            if (pattern.charAt(pIdx) == '*') {
                pIdx++;
                if (pIdx >= pLen) {
                    return true;
                }
                for (; ; ) {
                    if (recurseMatchPattern(string, pattern, sIdx, pIdx)) {
                        return true;
                    }
                    if (sIdx >= sLen) {
                        return false;
                    }
                    sIdx++;
                }
            }
            if (pattern.charAt(pIdx) == '?') {
                pIdx++;
                sIdx++;
            } else if (pattern.charAt(pIdx) == '[') {
                for (pIdx++; ; pIdx++) {
                    if ((pIdx >= pLen) || (pattern.charAt(pIdx) == ']')) {
                        return false;
                    }
                    if (pattern.charAt(pIdx) == string.charAt(sIdx)) {
                        break;
                    }
                    if ((pIdx < pLen - 1) && (pattern.charAt(pIdx + 1) == '-')) {
                        if (pIdx >= pLen - 2) {
                            return false;
                        }
                        char chStr = string.charAt(sIdx);
                        char chPtn = pattern.charAt(pIdx);
                        char chPtn2 = pattern.charAt(pIdx + 2);
                        if ((chPtn <= chStr) && (chPtn2 >= chStr)) {
                            break;
                        }
                        if ((chPtn >= chStr) && (chPtn2 <= chStr)) {
                            break;
                        }
                        pIdx += 2;
                    }
                }
                for (; pattern.charAt(pIdx) != ']'; pIdx++) {
                    if (pIdx >= pLen) {
                        pIdx--;
                        break;
                    }
                }
                pIdx++;
                sIdx++;
            } else {
                if (pattern.charAt(pIdx) == '\\') {
                    pIdx++;
                    if (pIdx >= pLen) {
                        return false;
                    }
                }
                if ((pIdx < pLen) && (sIdx < sLen) &&
                        (pattern.charAt(pIdx) != string.charAt(sIdx))) {
                    return false;
                }
                pIdx++;
                sIdx++;
            }
        }
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public static Vector parseDirectoryName(String path) {
        StringTokenizer st = new StringTokenizer(path, ";");
        Vector v = new Vector();
        while (st.hasMoreTokens()) {
            path = buildDirectoryName(st.nextToken());
            v.addElement(path);
        }
        v.trimToSize();
        return v;
    }

    public static String buildDirectoryName(String theDirName) {
        StringBuffer buf = new StringBuffer(theDirName);

        String separator = new String(System.getProperty("file.separator"));
        if (theDirName.length() == 0) {
            buf.append(".");
            buf.append(separator);
        } else if (!theDirName.endsWith(separator)) {
            char endChar = theDirName.charAt(theDirName.length() - 1);
            if ((endChar != '/') && (endChar != '\\')) {
                buf.append(separator);
            }
        }
        String returnStr = buf.toString();
        switch (separator.charAt(0)) {
            case '\\':
                if (returnStr.indexOf("/") != -1) {
                    returnStr = returnStr.replace('/', '\\');
                }
                if (returnStr.indexOf("\\") != -1) {
                    returnStr = returnStr.replace('\\', '\\');
                }
                break;
            case '/':
                returnStr = returnStr.replace('\\', '/');
        }
        return returnStr.replace('\\', '/');
    }

    @SuppressWarnings("resource")
    public static final byte[] readFileBytes(String name) {
        try {
            File file = new File(name);
            InputStream is = new FileInputStream(file);


            long length = file.length();


            byte[] bytes = new byte[(int) length];


            int offset = 0;
            int numRead = 0;
            while ((offset < bytes.length) && ((numRead = is.read(bytes, offset, bytes.length - offset)) >= 0)) {
                offset += numRead;
            }
            if (offset < bytes.length) {
                throw new IOException("Could not completely read file " + file.getName());
            }
            is.close();
            return bytes;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static final String readFile(String name) {
        byte[] bytes = readFileBytes(name);
        if (bytes != null) {
            return new String(bytes);
        }
        return "";
    }

    public static final String readFile(String name, String encoding) {
        byte[] bytes = readFileBytes(name);
        if (bytes != null) {
            try {
                return new String(bytes, encoding);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public static final void writeFile(String name, String text) {
        try {
            PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(name)));

            out.print(text);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static final void writeFile(File f, String text) {
        try {
            PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(f)));

            out.print(text);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void writeFile(String filename, byte[] bytes)
            throws Exception {
        FileOutputStream output = new FileOutputStream(filename);
        output.write(bytes);
        output.close();
    }

    public static void writeFile(File file, byte[] bytes)
            throws Exception {
        FileOutputStream output = new FileOutputStream(file);
        output.write(bytes);
        output.close();
    }

    public static void toFile(String dir, String path, String text)
            throws Exception {
        if ((dir.charAt(dir.length() - 1) == '\\') || (dir.charAt(dir.length() - 1) == '/')) {
            dir = dir.substring(0, dir.length() - 1);
        }
        createDirStructure(new File(dir.replace('\\', '/')));
        File file = new File(dir + "/" + path);
        File backup = null;
        if (file.exists()) {
            backup = backupFile(dir, file);
        }
        writeFile(file, text);
        if ((backup != null) && (compare(file, backup))) {
            backup.delete();
        }
    }

    public static final void createDirStructure(File pathName)
            throws Exception {
        if (pathName.exists()) {
            return;
        }
        if (!pathName.mkdirs()) {
            throw new Exception("Fail to create dir structure, check ...");
        }
    }

    public static File backupFile(String dir, File file) {
        int n = 0;
        for (; ; ) {
            n++;
            try {
                String newName = getNewName(file.getName(), n);
                File dest = new File(dir + "/" + newName);
                if (!dest.exists()) {
                    file.renameTo(dest);
                    return dest;
                }
            } catch (Exception e) {
            }
        }
    }

    static String getNewName(String oldName, int n) {
        String newName = oldName;
        @SuppressWarnings("unused")
        String ext = "";
        int idx = newName.indexOf(".");
        if (idx != -1) {
            newName = newName.substring(0, idx);
            ext = oldName.substring(idx, oldName.length());
        }
        newName = newName + ".bk" + n;
        return newName;
    }

    static boolean compare(File f1, File f2) {
        long s1 = f1.length();
        long s2 = f2.length();
        if (s1 == s2) {
            return true;
        }
        long r = s1 > s2 ? s1 - s2 : s2 - s1;
        return r < 4L;
    }

    public static void recurseDelDir(File root)
            throws Exception {
        boolean b = false;
        if (!root.exists()) {
            return;
        }
        if (root.isDirectory()) {
            String[] children = root.list();
            if ((children == null) || (children.length == 0)) {
                b = root.delete();
                if (!b) {
                    throw new Exception("Fail to delete, check ...");
                }
            } else {
                for (int i = 0; i < children.length; i++) {
                    recurseDelDir(new File(root, children[i]));
                }
                b = root.delete();
                if (!b) {
                    throw new Exception("Fail to delete, check ...");
                }
            }
        } else if (root.isFile()) {
            b = root.delete();
            if (!b) {
                throw new Exception("Fail to delete, check ...");
            }
        }
    }

    public static void renameDir(File source, File dest)
            throws Exception {
        if (source.equals(dest)) {
            throw new Exception("Source and Destination the same...");
        }
        source.renameTo(dest);
    }

    public static void main(String[] args) {
        try {
            String fileStr = fileToEncodeString("D:/temp/1.jpg");
            System.out.println(fileStr);
        } catch (Exception e) {
            System.out.println("" + e);
        }
    }
}

