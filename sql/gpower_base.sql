/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : gpowerbase

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 20/09/2019 16:34:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gfile
-- ----------------------------
DROP TABLE IF EXISTS `gfile`;
CREATE TABLE `gfile`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `extension` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '扩展名',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0:开启 1：关闭',
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 ：文件 1：目录',
  `create_time` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gfile_user_permission
-- ----------------------------
DROP TABLE IF EXISTS `gfile_user_permission`;
CREATE TABLE `gfile_user_permission`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `un`(`file_id`, `user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gliterature
-- ----------------------------
DROP TABLE IF EXISTS `gliterature`;
CREATE TABLE `gliterature`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文献内容（htmlcode）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gp_group
-- ----------------------------
DROP TABLE IF EXISTS `gp_group`;
CREATE TABLE `gp_group`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createtime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpentityrole
-- ----------------------------
DROP TABLE IF EXISTS `gpentityrole`;
CREATE TABLE `gpentityrole`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `entityID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entityType` int(11) NULL DEFAULT NULL,
  `userID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `groupID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roleID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `creationDate` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_userID`(`userID`) USING BTREE,
  INDEX `index_groupID`(`groupID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpermission
-- ----------------------------
DROP TABLE IF EXISTS `gpermission`;
CREATE TABLE `gpermission`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  UNIQUE INDEX `name`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gpermission
-- ----------------------------
INSERT INTO `gpermission` VALUES ('1', '用户管理', 'user');
INSERT INTO `gpermission` VALUES ('2', '角色管理', 'role');
INSERT INTO `gpermission` VALUES ('3', '用户组管理', 'group');
INSERT INTO `gpermission` VALUES ('4', '微信微博发送', 'wxwb');

-- ----------------------------
-- Table structure for gplog
-- ----------------------------
DROP TABLE IF EXISTS `gplog`;
CREATE TABLE `gplog`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `model_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `op_time` datetime(0) NULL DEFAULT NULL,
  `clazz` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `json` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `operate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `grade` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entity_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entity_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `idx_user_modelName_operate_entityName_status_opTime`(`user`, `model_name`, `operate`, `entity_name`, `status`, `op_time`) USING BTREE,
  INDEX `idx_opTime`(`op_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gprole
-- ----------------------------
DROP TABLE IF EXISTS `gprole`;
CREATE TABLE `gprole`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  UNIQUE INDEX `name`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gprole
-- ----------------------------
INSERT INTO `gprole` VALUES ('1', '系统管理员', 'administrator');
INSERT INTO `gprole` VALUES ('156b070885f146f2b3afc084ea0cff67', '普通用户', 'user');
INSERT INTO `gprole` VALUES ('5b6b6f10dd2042ffaa78da84711f3230', '院级管理员', 'groupmanager');
INSERT INTO `gprole` VALUES ('9db925d719a14be496177863754ba4f8', '实施用户', 'implementer');

-- ----------------------------
-- Table structure for gprole_permission
-- ----------------------------
DROP TABLE IF EXISTS `gprole_permission`;
CREATE TABLE `gprole_permission`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permission_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gprole_permission
-- ----------------------------
INSERT INTO `gprole_permission` VALUES ('2b91da05ba4c4ff3a6786a70861ed371', '1', '4');
INSERT INTO `gprole_permission` VALUES ('49c30bb6b6554832a582d5bdccde88d7', '156b070885f146f2b3afc084ea0cff67', '4');
INSERT INTO `gprole_permission` VALUES ('53fa8d8aeeca4f86b789d54048684133', '9db925d719a14be496177863754ba4f8', '4');
INSERT INTO `gprole_permission` VALUES ('5a510454fa7040bea81b64b3c14535dc', '1', '2');
INSERT INTO `gprole_permission` VALUES ('6cdded2e34da45b4aef0f6a90c6d2049', '1', '3');
INSERT INTO `gprole_permission` VALUES ('73fc6da968d648398db0fc39ba377ac3', '5b6b6f10dd2042ffaa78da84711f3230', '3');
INSERT INTO `gprole_permission` VALUES ('7b24d47de2cc42bb9fc67a9a09ecc135', '9db925d719a14be496177863754ba4f8', '2');
INSERT INTO `gprole_permission` VALUES ('89227f636f7841af953e373e2e1b5162', '1', '1');
INSERT INTO `gprole_permission` VALUES ('b13ee56cefd746e5a640f685909555bb', '5b6b6f10dd2042ffaa78da84711f3230', '4');
INSERT INTO `gprole_permission` VALUES ('bda8ab1c9b024a4f8c171d4969e9e7da', '5b6b6f10dd2042ffaa78da84711f3230', '1');
INSERT INTO `gprole_permission` VALUES ('c4f265c74c094fffa0f3f485a2d0b9ad', '9db925d719a14be496177863754ba4f8', '3');
INSERT INTO `gprole_permission` VALUES ('d270cf0dcdaa4acfb222aede1eeaaf2b', '9db925d719a14be496177863754ba4f8', '1');

-- ----------------------------
-- Table structure for gpuser
-- ----------------------------
DROP TABLE IF EXISTS `gpuser`;
CREATE TABLE `gpuser`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gpuser
-- ----------------------------
INSERT INTO `gpuser` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '2019-04-30 10:27:19', NULL);

-- ----------------------------
-- Table structure for gpuser_group
-- ----------------------------
DROP TABLE IF EXISTS `gpuser_group`;
CREATE TABLE `gpuser_group`  (
  `userId` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `groupId` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`userId`, `groupId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpuser_info
-- ----------------------------
DROP TABLE IF EXISTS `gpuser_info`;
CREATE TABLE `gpuser_info`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gpuser_info
-- ----------------------------
INSERT INTO `gpuser_info` VALUES ('1', 'admin', '管理员test', '13230212999', '2019-01-05 13:54:26');

-- ----------------------------
-- Table structure for gpuser_role
-- ----------------------------
DROP TABLE IF EXISTS `gpuser_role`;
CREATE TABLE `gpuser_role`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gpuser_role
-- ----------------------------
INSERT INTO `gpuser_role` VALUES ('2015010951054dc38b550de50e71aa95', 'e89136b12403468d863afa9dfd3ce7df', '1');
INSERT INTO `gpuser_role` VALUES ('2589b1bb99614d8bbd90d2320d1ff801', 'e89136b12403468d863afa9dfd3ce7df', '1');
INSERT INTO `gpuser_role` VALUES ('66b704dca35b4fad8139e1b5e34ea48e', '1', '1');
INSERT INTO `gpuser_role` VALUES ('b29a8f718b29486e8fc6c142e80af60d', 'e89136b12403468d863afa9dfd3ce7df', '1');

-- ----------------------------
-- Table structure for gpuser_wb
-- ----------------------------
DROP TABLE IF EXISTS `gpuser_wb`;
CREATE TABLE `gpuser_wb`  (
  `userid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `wbaccountid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpuser_wx
-- ----------------------------
DROP TABLE IF EXISTS `gpuser_wx`;
CREATE TABLE `gpuser_wx`  (
  `userid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `wxaccountid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwb_account
-- ----------------------------
DROP TABLE IF EXISTS `gpwb_account`;
CREATE TABLE `gpwb_account`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `token` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expireDate` datetime(0) NULL DEFAULT NULL,
  `creationDate` datetime(0) NULL DEFAULT NULL,
  `owner` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `clientID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clientSecret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwb_content
-- ----------------------------
DROP TABLE IF EXISTS `gpwb_content`;
CREATE TABLE `gpwb_content`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `creationDate` datetime(0) NULL DEFAULT NULL,
  `sendDate` datetime(0) NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `owner` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `weiboID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wbresult` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwb_data
-- ----------------------------
DROP TABLE IF EXISTS `gpwb_data`;
CREATE TABLE `gpwb_data`  (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `friendscount` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `statusescount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `followerscount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `wbaccountID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwb_emotion
-- ----------------------------
DROP TABLE IF EXISTS `gpwb_emotion`;
CREATE TABLE `gpwb_emotion`  (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phrase` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hot` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `common` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `picid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_account
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_account`;
CREATE TABLE `gpwx_account`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` int(11) NOT NULL COMMENT '1订阅号，2服务号',
  `authentication` int(11) NOT NULL COMMENT '0未认证，1已认证',
  `originalId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `appId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `appSecret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0不正常，1正常',
  `creationDate` datetime(0) NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `owner` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_content
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_content`;
CREATE TABLE `gpwx_content`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createDate` datetime(0) NULL DEFAULT NULL,
  `publishDate` datetime(0) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `wxAccountID` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `mpnewsMediaId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wxResult` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `auditreason` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `groupsendid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_data
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_data`;
CREATE TABLE `gpwx_data`  (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `msgid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `usersource` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `wxaccountID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `refdate` varchar(244) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `wxcontentID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_detail
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_detail`;
CREATE TABLE `gpwx_detail`  (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `wxaccountID` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `intpagereaduser` int(32) NULL DEFAULT NULL,
  `intpagereadcount` int(255) NULL DEFAULT NULL,
  `oripagereaduser` int(255) NULL DEFAULT NULL,
  `oripagereadcount` int(255) NULL DEFAULT NULL,
  `shareuser` int(255) NULL DEFAULT NULL,
  `sharecount` int(255) NULL DEFAULT NULL,
  `addtofavuser` int(255) NULL DEFAULT NULL,
  `addtofavcount` int(255) NULL DEFAULT NULL,
  `sharescene` int(255) NULL DEFAULT NULL,
  `intpagefromsessionreaduser` int(255) NULL DEFAULT NULL,
  `intpagefromsessionreadcount` int(255) NULL DEFAULT NULL,
  `msgid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `statdate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `targetuser` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_follower_summary
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_follower_summary`;
CREATE TABLE `gpwx_follower_summary`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accountID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `day` datetime(0) NULL DEFAULT NULL,
  `creationDate` datetime(0) NULL DEFAULT NULL,
  `userSource` int(11) NULL DEFAULT 0,
  `newUser` int(11) NULL DEFAULT 0,
  `cancelUser` int(11) NULL DEFAULT 0,
  `cumulateUser` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_imagecontent
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_imagecontent`;
CREATE TABLE `gpwx_imagecontent`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wxContentID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imageMediaID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imagetitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_newscontent
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_newscontent`;
CREATE TABLE `gpwx_newscontent`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wxContentID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sortID` bigint(13) NULL DEFAULT NULL,
  `thumbImageName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `thumbMediaId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `content_source_url` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `digest` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `show_cover_pic` int(11) NULL DEFAULT NULL,
  `msgID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gpwx_textcontent
-- ----------------------------
DROP TABLE IF EXISTS `gpwx_textcontent`;
CREATE TABLE `gpwx_textcontent`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wxContentID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gregistr
-- ----------------------------
DROP TABLE IF EXISTS `gregistr`;
CREATE TABLE `gregistr`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `work_email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0:未审核 1：通过 2：退回',
  `create_time` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gwelcome_tips
-- ----------------------------
DROP TABLE IF EXISTS `gwelcome_tips`;
CREATE TABLE `gwelcome_tips`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '协议内容',
  `sort_id` tinyint(10) NULL DEFAULT NULL COMMENT '排序字段',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;


