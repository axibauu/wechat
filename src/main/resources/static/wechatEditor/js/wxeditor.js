// check browser
$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()) || /trident/.test(navigator.userAgent.toLowerCase());

if ($.browser.msie) {
	alert("请使用谷歌浏览器,火狐,或者使用360/搜狗/猎豹等浏览器的极速模式操作");
}

// localize toolbox
UE.I18N['zh-cn'] = {
    'labelMap':{
        'anchor':'锚点', 'undo':'撤销', 'redo':'重做', 'bold':'加粗', 'indent':'首行缩进', 'snapscreen':'截图',
        'italic':'斜体', 'underline':'下划线', 'strikethrough':'删除线', 'subscript':'下标','fontborder':'字符边框',
        'superscript':'上标', 'formatmatch':'格式刷', 'source':'源代码', 'blockquote':'引用',
        'pasteplain':'纯文本粘贴模式', 'selectall':'全选', 'print':'打印', 'preview':'预览',
        'horizontal':'分隔线', 'removeformat':'清除格式', 'time':'时间', 'date':'日期',
        'unlink':'取消链接', 'insertrow':'前插入行', 'insertcol':'前插入列', 'mergeright':'右合并单元格', 'mergedown':'下合并单元格',
        'deleterow':'删除行', 'deletecol':'删除列', 'splittorows':'拆分成行',
        'splittocols':'拆分成列', 'splittocells':'完全拆分单元格','deletecaption':'删除表格标题','inserttitle':'插入标题',
        'mergecells':'合并多个单元格', 'deletetable':'删除表格', 'cleardoc':'清空文档','insertparagraphbeforetable':'表格前插入行','insertcode':'代码语言',
        'fontfamily':'字体', 'fontsize':'字号', 'paragraph':'段落格式', 'simpleupload':'单图上传', 'insertimage':'多图上传','edittable':'表格属性','edittd':'单元格属性', 'link':'超链接',
        'emotion':'表情', 'spechars':'特殊字符', 'searchreplace':'查询替换', 'map':'Baidu地图', 'gmap':'Google地图',
        'insertvideo':'视频', 'help':'帮助', 'justifyleft':'居左对齐', 'justifyright':'居右对齐', 'justifycenter':'居中对齐',
        'justifyjustify':'两端对齐', 'forecolor':'字体颜色', 'backcolor':'背景色', 'insertorderedlist':'有序列表',
        'insertunorderedlist':'无序列表', 'fullscreen':'全屏', 'directionalityltr':'从左向右输入', 'directionalityrtl':'从右向左输入',
        'rowspacingtop':'段前距', 'rowspacingbottom':'段后距',  'pagebreak':'分页', 'insertframe':'插入Iframe', 'imagenone':'默认',
        'imageleft':'左浮动', 'imageright':'右浮动', 'attachment':'附件', 'imagecenter':'居中', 'wordimage':'图片转存',
        'lineheight':'行间距','edittip' :'编辑提示','customstyle':'自定义标题', 'autotypeset':'自动排版',
        'webapp':'百度应用','touppercase':'字母大写', 'tolowercase':'字母小写','background':'背景','template':'模板','scrawl':'涂鸦',
        'music':'音乐','inserttable':'插入表格','drafts': '从草稿箱加载', 'charts': '图表',
		'imagestyle': '图片样式设置' // 自定义tool
    },
    'insertorderedlist':{
        'num':'1,2,3...',
        'num1':'1),2),3)...',
        'num2':'(1),(2),(3)...',
        'cn':'一,二,三....',
        'cn1':'一),二),三)....',
        'cn2':'(一),(二),(三)....',
        'decimal':'1,2,3...',
        'lower-alpha':'a,b,c...',
        'lower-roman':'i,ii,iii...',
        'upper-alpha':'A,B,C...',
        'upper-roman':'I,II,III...'
    },
    'insertunorderedlist':{
        'circle':'○ 大圆圈',
        'disc':'● 小黑点',
        'square':'■ 小方块 ',
        'dash' :'— 破折号',
        'dot':' 。 小圆圈'
    },
    'paragraph':{'p':'段落', 'h1':'标题 1', 'h2':'标题 2', 'h3':'标题 3', 'h4':'标题 4', 'h5':'标题 5', 'h6':'标题 6'},
    'fontfamily':{
        'songti':'宋体',
        'kaiti':'楷体',
        'heiti':'黑体',
        'lishu':'隶书',
        'yahei':'微软雅黑',
        'andaleMono':'andale mono',
        'arial': 'arial',
        'arialBlack':'arial black',
        'comicSansMs':'comic sans ms',
        'impact':'impact',
        'timesNewRoman':'times new roman'
    },
    'customstyle':{
        'tc':'标题居中',
        'tl':'标题居左',
        'im':'强调',
        'hi':'明显强调'
    },
    'autoupload': {
        'exceedSizeError': '文件大小超出限制',
        'exceedTypeError': '文件格式不允许',
        'jsonEncodeError': '服务器返回格式错误',
        'loading':'正在上传...',
        'loadError':'上传错误',
        'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！'
    },
    'simpleupload':{
        'exceedSizeError': '文件大小超出限制',
        'exceedTypeError': '文件格式不允许',
        'jsonEncodeError': '服务器返回格式错误',
        'loading':'正在上传...',
        'loadError':'上传错误',
        'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！'
    },
    'elementPathTip':'元素路径',
    'wordCountTip':'字数统计',
    'wordCountMsg':'当前已输入{#count}个字符, 您还可以输入{#leave}个字符。 ',
    'wordOverFlowMsg':'<span style="color:red;">字数超出最大允许值，服务器可能拒绝保存！</span>',
    'ok':'确认',
    'cancel':'取消',
    'closeDialog':'关闭对话框',
    'tableDrag':'表格拖动必须引入uiUtils.js文件！',
    'autofloatMsg':'工具栏浮动依赖编辑器UI，您首先需要引入UI文件!',
    'loadconfigError': '获取后台配置项请求出错，上传功能将不能正常使用！',
    'loadconfigFormatError': '后台配置项返回格式出错，上传功能将不能正常使用！',
    'loadconfigHttpError': '请求后台配置项http错误，上传功能将不能正常使用！',
    'snapScreen_plugin':{
        'browserMsg':'仅支持IE浏览器！',
        'callBackErrorMsg':'服务器返回数据有误，请检查配置项之后重试。',
        'uploadErrorMsg':'截图上传失败，请检查服务器端环境! '
    },
    'insertcode':{
        'as3':'ActionScript 3',
        'bash':'Bash/Shell',
        'cpp':'C/C++',
        'css':'CSS',
        'cf':'ColdFusion',
        'c#':'C#',
        'delphi':'Delphi',
        'diff':'Diff',
        'erlang':'Erlang',
        'groovy':'Groovy',
        'html':'HTML',
        'java':'Java',
        'jfx':'JavaFX',
        'js':'JavaScript',
        'pl':'Perl',
        'php':'PHP',
        'plain':'Plain Text',
        'ps':'PowerShell',
        'python':'Python',
        'ruby':'Ruby',
        'scala':'Scala',
        'sql':'SQL',
        'vb':'Visual Basic',
        'xml':'XML'
    },
    'confirmClear':'确定清空当前文档么？',
    'contextMenu':{
        'delete':'删除',
        'selectall':'全选',
        'deletecode':'删除代码',
        'cleardoc':'清空文档',
        'confirmclear':'确定清空当前文档么？',
        'unlink':'删除超链接',
        'paragraph':'段落格式',
        'edittable':'表格属性',
        'aligntd':'单元格对齐方式',
        'aligntable':'表格对齐方式',
        'tableleft':'左浮动',
        'tablecenter':'居中显示',
        'tableright':'右浮动',
        'edittd':'单元格属性',
        'setbordervisible':'设置表格边线可见',
        'justifyleft':'左对齐',
        'justifyright':'右对齐',
        'justifycenter':'居中对齐',
        'justifyjustify':'两端对齐',
        'table':'表格',
        'inserttable':'插入表格',
        'deletetable':'删除表格',
        'insertparagraphbefore':'前插入段落',
        'insertparagraphafter':'后插入段落',
        'deleterow':'删除当前行',
        'deletecol':'删除当前列',
        'insertrow':'前插入行',
        'insertcol':'左插入列',
        'insertrownext':'后插入行',
        'insertcolnext':'右插入列',
        'insertcaption':'插入表格名称',
        'deletecaption':'删除表格名称',
        'inserttitle':'插入表格标题行',
        'deletetitle':'删除表格标题行',
        'inserttitlecol':'插入表格标题列',
        'deletetitlecol':'删除表格标题列',
        'averageDiseRow':'平均分布各行',
        'averageDisCol':'平均分布各列',
        'mergeright':'向右合并',
        'mergeleft':'向左合并',
        'mergedown':'向下合并',
        'mergecells':'合并单元格',
        'splittocells':'完全拆分单元格',
        'splittocols':'拆分成列',
        'splittorows':'拆分成行',
        'tablesort':'表格排序',
        'enablesort':'设置表格可排序',
        'disablesort':'取消表格可排序',
        'reversecurrent':'逆序当前',
        'orderbyasc':'按ASCII字符升序',
        'reversebyasc':'按ASCII字符降序',
        'orderbynum':'按数值大小升序',
        'reversebynum':'按数值大小降序',
        'borderbk':'边框底纹',
        'setcolor':'表格隔行变色',
        'unsetcolor':'取消表格隔行变色',
        'setbackground':'选区背景隔行',
        'unsetbackground':'取消选区背景',
        'redandblue':'红蓝相间',
        'threecolorgradient':'三色渐变',
        'copy':'复制(Ctrl + c)',
        'copymsg': '浏览器不支持,请使用 "Ctrl + c"',
        'paste':'粘贴(Ctrl + v)',
        'pastemsg': '浏览器不支持,请使用 "Ctrl + v"'
    },
    'copymsg': '浏览器不支持,请使用 "Ctrl + c"',
    'pastemsg': '浏览器不支持,请使用 "Ctrl + v"',
    'anthorMsg':'链接',
    'clearColor':'清空颜色',
    'standardColor':'标准颜色',
    'themeColor':'主题颜色',
    'property':'属性',
    'default':'默认',
    'modify':'修改',
    'justifyleft':'左对齐',
    'justifyright':'右对齐',
    'justifycenter':'居中',
    'justify':'默认',
    'imgPreview': '预览', // 自定义: 预览图片
    'imgChange': '换图', // 自定义: 换图
    'imgCircle': '圆形', // 自定义: 圆形图片
    'imgSquare': '正方形', // 自定义: 正方形图片
    'imgParaBefore': '前空行', // 自定义: 前插入空行
    'imgParaAfter': '后空行', // 自定义: 后插入空行
    'imgStyle': '图片边框阴影', // 自定义: 图片边框阴影
    'clear':'清除',
    'anchorMsg':'锚点',
    'delete':'删除',
    'clickToUpload':'点击上传',
    'unset':'尚未设置语言文件',
    't_row':'行',
    't_col':'列',
    'more':'更多',
    'pasteOpt':'粘贴选项',
    'pasteSourceFormat':'保留源格式',
    'tagFormat':'只保留标签',
    'pasteTextFormat':'只保留文本',
    'autoTypeSet':{
        'mergeLine':'合并空行',
        'delLine':'清除空行',
        'removeFormat':'清除格式',
        'indent':'首行缩进',
        'alignment':'对齐方式',
        'imageFloat':'图片浮动',
        'removeFontsize':'清除字号',
        'removeFontFamily':'清除字体',
        'removeHtml':'清除冗余HTML代码',
        'pasteFilter':'粘贴过滤',
        'run':'执行',
        'symbol':'符号转换',
        'bdc2sb':'全角转半角',
        'tobdc':'半角转全角'
    },

    'background':{
        'static':{
            'lang_background_normal':'背景设置',
            'lang_background_local':'在线图片',
            'lang_background_set':'选项',
            'lang_background_none':'无背景色',
            'lang_background_colored':'有背景色',
            'lang_background_color':'颜色设置',
            'lang_background_netimg':'网络图片',
            'lang_background_align':'对齐方式',
            'lang_background_position':'精确定位',
            'repeatType':{'options':['居中', '横向重复', '纵向重复', '平铺','自定义']}

        },
        'noUploadImage':'当前未上传过任何图片！',
        'toggleSelect':'单击可切换选中状态\n原图尺寸: '
    },
    //===============dialog i18N=======================
    'insertimage':{
        'static':{
            'lang_tab_remote':'插入图片', //节点
            'lang_tab_upload':'本地上传',
            'lang_tab_online':'在线管理',
            'lang_tab_search':'图片搜索',
            'lang_input_url':'地 址：',
            'lang_input_size':'大 小：',
            'lang_input_width':'宽度',
            'lang_input_height':'高度',
            'lang_input_border':'边 框：',
            'lang_input_vhspace':'边 距：',
            'lang_input_title':'描 述：',
            'lang_input_align':'图片浮动方式：',
            'lang_imgLoading':'　图片加载中……',
            'lang_start_upload':'开始上传',
            'lock':{'title':'锁定宽高比例'}, //属性
            'searchType':{'title':'图片类型', 'options':['新闻', '壁纸', '表情', '头像']}, //select的option
            'searchTxt':{'value':'请输入搜索关键词'},
            'searchBtn':{'value':'百度一下'},
            'searchReset':{'value':'清空搜索'},
            'noneAlign':{'title':'无浮动'},
            'leftAlign':{'title':'左浮动'},
            'rightAlign':{'title':'右浮动'},
            'centerAlign':{'title':'居中独占一行'}
        },
        'uploadSelectFile':'点击选择图片',
        'uploadAddFile':'继续添加',
        'uploadStart':'开始上传',
        'uploadPause':'暂停上传',
        'uploadContinue':'继续上传',
        'uploadRetry':'重试上传',
        'uploadDelete':'删除',
        'uploadTurnLeft':'向左旋转',
        'uploadTurnRight':'向右旋转',
        'uploadPreview':'预览中',
        'uploadNoPreview':'不能预览',
        'updateStatusReady': '选中_张图片，共_KB。',
        'updateStatusConfirm': '已成功上传_张照片，_张照片上传失败',
        'updateStatusFinish': '共_张（_KB），_张上传成功',
        'updateStatusError': '，_张上传失败。',
        'errorNotSupport': 'WebUploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器。',
        'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！',
        'errorExceedSize':'文件大小超出',
        'errorFileType':'文件格式不允许',
        'errorInterrupt':'文件传输中断',
        'errorUploadRetry':'上传失败，请重试',
        'errorHttp':'http请求错误',
        'errorServerUpload':'服务器返回出错',
        'remoteLockError':'宽高不正确,不能所定比例',
        'numError':'请输入正确的长度或者宽度值！例如：123，400',
        'imageUrlError':'不允许的图片格式或者图片域！',
        'imageLoadError':'图片加载失败！请检查链接地址或网络状态！',
        'searchRemind':'请输入搜索关键词',
        'searchLoading':'图片加载中，请稍后……',
        'searchRetry':' :( ，抱歉，没有找到图片！请重试一次！'
    },
    'attachment':{
        'static':{
            'lang_tab_upload': '上传附件',
            'lang_tab_online': '在线附件',
            'lang_start_upload':'开始上传',
            'lang_drop_remind':'可以将文件拖到这里，单次最多可选100个文件'
        },
        'uploadSelectFile':'点击选择文件',
        'uploadAddFile':'继续添加',
        'uploadStart':'开始上传',
        'uploadPause':'暂停上传',
        'uploadContinue':'继续上传',
        'uploadRetry':'重试上传',
        'uploadDelete':'删除',
        'uploadTurnLeft':'向左旋转',
        'uploadTurnRight':'向右旋转',
        'uploadPreview':'预览中',
        'updateStatusReady': '选中_个文件，共_KB。',
        'updateStatusConfirm': '已成功上传_个文件，_个文件上传失败',
        'updateStatusFinish': '共_个（_KB），_个上传成功',
        'updateStatusError': '，_张上传失败。',
        'errorNotSupport': 'WebUploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器。',
        'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！',
        'errorExceedSize':'文件大小超出',
        'errorFileType':'文件格式不允许',
        'errorInterrupt':'文件传输中断',
        'errorUploadRetry':'上传失败，请重试',
        'errorHttp':'http请求错误',
        'errorServerUpload':'服务器返回出错'
    },
    'insertvideo':{
        'static':{
            'lang_tab_insertV':'插入视频',
            'lang_tab_searchV':'搜索视频',
            'lang_tab_uploadV':'上传视频',
            'lang_video_url':'视频网址',
            'lang_video_size':'视频尺寸',
            'lang_videoW':'宽度',
            'lang_videoH':'高度',
            'lang_alignment':'对齐方式',
            'videoSearchTxt':{'value':'请输入搜索关键字！'},
            'videoType':{'options':['全部', '热门', '娱乐', '搞笑', '体育', '科技', '综艺']},
            'videoSearchBtn':{'value':'百度一下'},
            'videoSearchReset':{'value':'清空结果'},
            'lang_input_fileStatus':' 当前未上传文件',
            'startUpload':{'style':'background:url(upload.png) no-repeat;'},
            'lang_upload_size':'视频尺寸',
            'lang_upload_width':'宽度',
            'lang_upload_height':'高度',
            'lang_upload_alignment':'对齐方式',
            'lang_format_advice':'建议使用mp4格式.'

        },
        'numError':'请输入正确的数值，如123,400',
        'floatLeft':'左浮动',
        'floatRight':'右浮动',
        'default':'默认',
        'block':'独占一行',
        'urlError':'输入的视频地址有误，请检查后再试！',
        'loading':' &nbsp;视频加载中，请等待……',
        'clickToSelect':'点击选中',
        'goToSource':'访问源视频',
        'noVideo':' &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！',

        'browseFiles':'浏览文件',
        'uploadSuccess':'上传成功!',
        'delSuccessFile':'从成功队列中移除',
        'delFailSaveFile':'移除保存失败文件',
        'statusPrompt':' 个文件已上传！ ',
        'flashVersionError':'当前Flash版本过低，请更新FlashPlayer后重试！',
        'flashLoadingError':'Flash加载失败!请检查路径或网络状态',
        'fileUploadReady':'等待上传……',
        'delUploadQueue':'从上传队列中移除',
        'limitPrompt1':'单次不能选择超过',
        'limitPrompt2':'个文件！请重新选择！',
        'delFailFile':'移除失败文件',
        'fileSizeLimit':'文件大小超出限制！',
        'emptyFile':'空文件无法上传！',
        'fileTypeError':'文件类型不允许！',
        'unknownError':'未知错误！',
        'fileUploading':'上传中，请等待……',
        'cancelUpload':'取消上传',
        'netError':'网络错误',
        'failUpload':'上传失败!',
        'serverIOError':'服务器IO错误！',
        'noAuthority':'无权限！',
        'fileNumLimit':'上传个数限制',
        'failCheck':'验证失败，本次上传被跳过！',
        'fileCanceling':'取消中，请等待……',
        'stopUploading':'上传已停止……',

        'uploadSelectFile':'点击选择文件',
        'uploadAddFile':'继续添加',
        'uploadStart':'开始上传',
        'uploadPause':'暂停上传',
        'uploadContinue':'继续上传',
        'uploadRetry':'重试上传',
        'uploadDelete':'删除',
        'uploadTurnLeft':'向左旋转',
        'uploadTurnRight':'向右旋转',
        'uploadPreview':'预览中',
        'updateStatusReady': '选中_个文件，共_KB。',
        'updateStatusConfirm': '成功上传_个，_个失败',
        'updateStatusFinish': '共_个(_KB)，_个成功上传',
        'updateStatusError': '，_张上传失败。',
        'errorNotSupport': 'WebUploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器。',
        'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！',
        'errorExceedSize':'文件大小超出',
        'errorFileType':'文件格式不允许',
        'errorInterrupt':'文件传输中断',
        'errorUploadRetry':'上传失败，请重试',
        'errorHttp':'http请求错误',
        'errorServerUpload':'服务器返回出错'
    },
    'webapp':{
        'tip1':'本功能由百度APP提供，如看到此页面，请各位站长首先申请百度APPKey!',
        'tip2':'申请完成之后请至ueditor.config.js中配置获得的appkey! ',
        'applyFor':'点此申请',
        'anthorApi':'百度API'
    },
    'template':{
        'static':{
            'lang_template_bkcolor':'背景颜色',
            'lang_template_clear' : '保留原有内容',
            'lang_template_select' : '选择模板'
        },
        'blank':'空白文档',
        'blog':'博客文章',
        'resume':'个人简历',
        'richText':'图文混排',
        'sciPapers':'科技论文'


    },
    'scrawl':{
        'static':{
            'lang_input_previousStep':'上一步',
            'lang_input_nextsStep':'下一步',
            'lang_input_clear':'清空',
            'lang_input_addPic':'添加背景',
            'lang_input_ScalePic':'缩放背景',
            'lang_input_removePic':'删除背景',
            'J_imgTxt':{title:'添加背景图片'}
        },
        'noScarwl':'尚未作画，白纸一张~',
        'scrawlUpLoading':'涂鸦上传中,别急哦~',
        'continueBtn':'继续',
        'imageError':'糟糕，图片读取失败了！',
        'backgroundUploading':'背景图片上传中,别急哦~'
    },
    'music':{
        'static':{
            'lang_input_tips':'输入歌手/歌曲/专辑，搜索您感兴趣的音乐！',
            'J_searchBtn':{value:'搜索歌曲'}
        },
        'emptyTxt':'未搜索到相关音乐结果，请换一个关键词试试。',
        'chapter':'歌曲',
        'singer':'歌手',
        'special':'专辑',
        'listenTest':'试听'
    },
    'anchor':{
        'static':{
            'lang_input_anchorName':'锚点名字：'
        }
    },
    'charts':{
        'static':{
            'lang_data_source':'数据源：',
            'lang_chart_format': '图表格式：',
            'lang_data_align': '数据对齐方式',
            'lang_chart_align_same': '数据源与图表X轴Y轴一致',
            'lang_chart_align_reverse': '数据源与图表X轴Y轴相反',
            'lang_chart_title': '图表标题',
            'lang_chart_main_title': '主标题：',
            'lang_chart_sub_title': '子标题：',
            'lang_chart_x_title': 'X轴标题：',
            'lang_chart_y_title': 'Y轴标题：',
            'lang_chart_tip': '提示文字',
            'lang_cahrt_tip_prefix': '提示文字前缀：',
            'lang_cahrt_tip_description': '仅饼图有效， 当鼠标移动到饼图中相应的块上时，提示框内的文字的前缀',
            'lang_chart_data_unit': '数据单位',
            'lang_chart_data_unit_title': '单位：',
            'lang_chart_data_unit_description': '显示在每个数据点上的数据的单位， 比如： 温度的单位 ℃',
            'lang_chart_type': '图表类型：',
            'lang_prev_btn': '上一个',
            'lang_next_btn': '下一个'
        }
    },
    'emotion':{
        'static':{
            'lang_input_choice':'精选',
            'lang_input_Tuzki':'兔斯基',
            'lang_input_BOBO':'BOBO',
            'lang_input_lvdouwa':'绿豆蛙',
            'lang_input_babyCat':'baby猫',
            'lang_input_bubble':'泡泡',
            'lang_input_youa':'有啊'
        }
    },
    'gmap':{
        'static':{
            'lang_input_address':'地址',
            'lang_input_search':'搜索',
            'address':{value:'北京'}
        },
        searchError:'无法定位到该地址!'
    },
    'help':{
        'static':{
            'lang_input_about':'关于UEditor',
            'lang_input_shortcuts':'快捷键',
            'lang_input_introduction':'UEditor是由百度web前端研发部开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点。开源基于BSD协议，允许自由使用和修改代码。',
            'lang_Txt_shortcuts':'快捷键',
            'lang_Txt_func':'功能',
            'lang_Txt_bold':'给选中字设置为加粗',
            'lang_Txt_copy':'复制选中内容',
            'lang_Txt_cut':'剪切选中内容',
            'lang_Txt_Paste':'粘贴',
            'lang_Txt_undo':'重新执行上次操作',
            'lang_Txt_redo':'撤销上一次操作',
            'lang_Txt_italic':'给选中字设置为斜体',
            'lang_Txt_underline':'给选中字加下划线',
            'lang_Txt_selectAll':'全部选中',
            'lang_Txt_visualEnter':'软回车',
            'lang_Txt_fullscreen':'全屏'
        }
    },
    'insertframe':{
        'static':{
            'lang_input_address':'地址：',
            'lang_input_width':'宽度：',
            'lang_input_height':'高度：',
            'lang_input_isScroll':'允许滚动条：',
            'lang_input_frameborder':'显示框架边框：',
            'lang_input_alignMode':'对齐方式：',
            'align':{title:'对齐方式', options:['默认', '左对齐', '右对齐', '居中']}
        },
        'enterAddress':'请输入地址!'
    },
    'link':{
        'static':{
            'lang_input_text':'文本内容：',
            'lang_input_url':'链接地址：',
            'lang_input_title':'标题：',
            'lang_input_target':'是否在新窗口打开：'
        },
        'validLink':'只支持选中一个链接时生效',
        'httpPrompt':'您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀'
    },
    'map':{
        'static':{
            lang_city:'城市',
            lang_address:'地址',
            city:{value:'北京'},
            lang_search:'搜索',
            lang_dynamicmap:'插入动态地图'
        },
        cityMsg:'请选择城市',
        errorMsg:'抱歉，找不到该位置！'
    },
    'searchreplace':{
        'static':{
            lang_tab_search:'查找',
            lang_tab_replace:'替换',
            lang_search1:'查找',
            lang_search2:'查找',
            lang_replace:'替换',
            lang_searchReg:'支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”',
            lang_searchReg1:'支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”',
            lang_case_sensitive1:'区分大小写',
            lang_case_sensitive2:'区分大小写',
            nextFindBtn:{value:'下一个'},
            preFindBtn:{value:'上一个'},
            nextReplaceBtn:{value:'下一个'},
            preReplaceBtn:{value:'上一个'},
            repalceBtn:{value:'替换'},
            repalceAllBtn:{value:'全部替换'}
        },
        getEnd:'已经搜索到文章末尾！',
        getStart:'已经搜索到文章头部',
        countMsg:'总共替换了{#count}处！'
    },
    'snapscreen':{
        'static':{
            lang_showMsg:'截图功能需要首先安装UEditor截图插件！ ',
            lang_download:'点此下载',
            lang_step1:'第一步，下载UEditor截图插件并运行安装。',
            lang_step2:'第二步，插件安装完成后即可使用，如不生效，请重启浏览器后再试！'
        }
    },
    'spechars':{
        'static':{},
        tsfh:'特殊字符',
        lmsz:'罗马字符',
        szfh:'数学字符',
        rwfh:'日文字符',
        xlzm:'希腊字母',
        ewzm:'俄文字符',
        pyzm:'拼音字母',
        yyyb:'英语音标',
        zyzf:'其他'
    },
    'edittable':{
        'static':{
            'lang_tableStyle':'表格样式',
            'lang_insertCaption':'添加表格名称行',
            'lang_insertTitle':'添加表格标题行',
            'lang_insertTitleCol':'添加表格标题列',
            'lang_orderbycontent':'使表格内容可排序',
            'lang_tableSize':'自动调整表格尺寸',
            'lang_autoSizeContent':'按表格文字自适应',
            'lang_autoSizePage':'按页面宽度自适应',
            'lang_example':'示例',
            'lang_borderStyle':'表格边框',
            'lang_color':'颜色:'
        },
        captionName:'表格名称',
        titleName:'标题',
        cellsName:'内容',
        errorMsg:'有合并单元格，不可排序'
    },
    'edittip':{
        'static':{
            lang_delRow:'删除整行',
            lang_delCol:'删除整列'
        }
    },
    'edittd':{
        'static':{
            lang_tdBkColor:'背景颜色:'
        }
    },
    'formula':{
        'static':{
        }
    },
    'wordimage':{
        'static':{
            lang_resave:'转存步骤',
            uploadBtn:{src:'upload.png',alt:'上传'},
            clipboard:{style:'background: url(copy.png) -153px -1px no-repeat;'},
            lang_step:'1、点击顶部复制按钮，将地址复制到剪贴板；2、点击添加照片按钮，在弹出的对话框中使用Ctrl+V粘贴地址；3、点击打开后选择图片上传流程。'
        },
        'fileType':'图片',
        'flashError':'FLASH初始化失败，请检查FLASH插件是否正确安装！',
        'netError':'网络连接错误，请重试！',
        'copySuccess':'图片地址已经复制！',
        'flashI18n':{} //留空默认中文
    },
    'autosave': {
        'saving':'保存中...',
        'success':'本地保存成功'
    }
};

var random_color_step = 1;
var custom_style_set = false;
var current_select_color = "#FFFFFF";
var current_edit_msg_id = "";
var replace_interval = null;
function strip_tags(input, allowed) {
	allowed = (((allowed || "") + "")
		.toLowerCase()
		.match(/<[a-z][a-z0-9]*>/g) || [])
		.join("");
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
		commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input
		.replace(commentsAndPhpTags, "")
		.replace(tags, function($0, $1) {
			return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
		});
}
function getDealingHtml() {
	var html = getSelectionHtml();
	if (html == "") {
		return current_editor.getContent();
	} else {
		return html;
	}
}
function getSelectionHtml() {
	var range = current_editor.selection.getRange();
	range.select();
	var selectionObj = current_editor.selection.getNative();
	var rangeObj = selectionObj.getRangeAt(0);
	var docFragment = rangeObj.cloneContents();
	var testDiv = document.createElement("div");
	testDiv.appendChild(docFragment);
	var selectHtml = testDiv.innerHTML;
	return selectHtml;
}
function setDealingHtml(newHtml) {
	var html = getSelectionHtml();
	if (html != "") {
		insertHtml(newHtml);
		custom_style_set = true;
		current_editor.undoManger.save();
		return;
	} else {
		current_editor.setContent(newHtml);
		current_editor.undoManger.save();
		return;
	}
}
function getEditorHtml() {
	$(current_editor.selection.document).find("p").each(function() {
		if ($.trim($(this).html()) == "&nbsp;") {
			$(this).html("<br/>");
		}
		if ($.trim($(this).text()) == "") {
			if ($(this).find("img").size() > 0) {
				return;
			}
			if ($(this).find("br").size() > 0) {
				$(this).html("<br/>");
			} else {
				if (this.style.clear != "both") {
					$(this).remove();
				}
			}
		}
	});
	var html = current_editor.getContent();
	var htmlObj = $("<div>" + html + " </div>");
	var htmlTable = htmlObj.find("table");
	htmlObj.find("*").css("box-sizing", "border-box");
	htmlObj.find("*").each(function() {
		if (
			this.style.padding == "" &&
			this.style.paddingLeft == "" &&
			this.style.paddingRight == "" &&
			this.style.paddingTop == "" &&
			this.style.paddingBottom == ""
		) {
			this.style.padding = "0px";
		}
		if (
			this.style.margin == "" &&
			this.style.marginLeft == "" &&
			this.style.marginRight == "" &&
			this.style.marginTop == "" &&
			this.style.marginBottom == ""
		) {
			this.style.margin = "0px";
		}
	});
	htmlObj.find(".recommend-style-content").each(function() {
		$(this).css({
			border: "0 none",
			"font-size": "14px",
			"font-family": "微软雅黑",
			padding: 0
		});
	});
	return htmlObj.html();
}
function setEditorHtml(newHtml) {
	current_editor.undoManger.save();
	current_editor.setContent(newHtml);
	current_editor.undoManger.save();
}
function setImgContainerBg(imgObj, imgSrc) {
	// var domUtils = baidu.editor.dom.domUtils;
	// var imgContainerWithBg = domUtils.findParent(imgObj, function(node) {
	// 	return domUtils.hasClass(node, 'img-container-with-bg');
	// })
	// if (imgContainerWithBg !== null) {
	// 	domUtils.setStyle(imgContainerWithBg, 'background-image', imgSrc ? 'url(' + imgSrc + ')' : '');
	// }
	var imgContainerWithBg = $(imgObj).parent('.img-container-with-bg');
	if (imgContainerWithBg) {
		imgContainerWithBg.css('background-image', imgSrc ? 'url(' + imgSrc + ')' : '');
	}
}
function insertHtml(html) {
	var select_html = getSelectionHtml(),
		domUtils = baidu.editor.dom.domUtils,
		range = current_editor.selection.getRange();
	var test = range.startContainer;
	if (select_html != "") {
		select_html = strip_tags(
			select_html,
			"<br><p><h1><h2><h3><h4><h5><h6><img>"
		);
		var select_obj = $("<div>" + select_html + "</div>");
		select_obj.find("*").each(function() {
			$(this).removeAttr("style");
			$(this).removeAttr("class");
			$(this).removeAttr("placeholder");
		});
		var obj = $("<div>" + html + "</div>");
		select_obj.find("h1,h2,h3,h4,h5,h6").each(function(i) {
			var title = obj.find(".item-title").eq(i);
			if (title && title.size() > 0) {
				title.html($.trim($(this).text()));
				$(this).remove();
			} else {
				$(this).replaceWith("<p>" + $(this).text() + "</p>");
			}
		});
		select_obj.find("img").each(function(i) {
			var img = obj.find("img").eq(i);
			if (img && img.size() > 0) {
				var imgSrc = $(this).attr("src");
				img.attr("src", imgSrc);
				var imgContainer = range.startContainer;
				if ($(imgContainer).hasClass('img-container-with-bg')) {
					$(imgContainer).remove();
				} else {
					$(this).remove();
				}
				setImgContainerBg(img, imgSrc);
			}
		});
		// brush
		var brushs = obj.find(".item-brush");
		var total = brushs.size();
		if (total > 0) {
			if (total == 1) {
				var brush_item = obj.find(".item-brush:first");
				if (brush_item.data("brushtype") == "text") {
					brush_item.html($.trim(select_obj.text()));
				} else {
					select_obj.contents().each(function(i) {
						var $this = this;
						if (this.tagName == "IMG") {
							return;
						}
						if (
							$.trim($($this).text()) == "" ||
							this.tagName == "BR" ||
							$(this).html() == "" ||
							$(this).html() == "&nbsp;" ||
							$(this).html() == "<br>" ||
							$(this).html() == "<br/>"
						) {
							$(this).remove();
						}
					});
					var style = brush_item.data("style");
					if (style) {
						select_obj.find("*").each(function() {
							$(this).attr("style", style);
						});
					}
					brush_item.html(select_obj.html());
				}
			} else {
				select_obj.contents().each(function(i) {
					var $this = this;
					if (this.tagName == "IMG") {
						return;
					}
					if (
						$.trim($($this).text()) == "" ||
						this.tagName == "BR" ||
						$(this).html() == "" ||
						$(this).html() == "&nbsp;" ||
						$(this).html() == "<br>" ||
						$(this).html() == "<br/>"
					) {
						$(this).remove();
					}
				});
				select_obj.contents().each(function(i) {
					var $this = this;
					if ($this.nodeType == 3) {
						$this = $("<p>" + $(this).text() + "</p>").get(0);
					}
					if (i < total) {
						var brush_item = brushs.eq(i);
						if (brush_item.data("brushtype") == "text") {
							brush_item.html($.trim($($this).text()));
						} else {
							var style = brush_item.data("style");
							if (style) {
								$($this).attr("style", style);
							}
							brush_item.empty().append($($this));
						}
					} else {
						var brush_item = brushs.eq(total - 1);
						if (brush_item.data("brushtype") == "text") {
							brush_item.append($($this).text());
						} else {
							var style = brush_item.data("style");
							if (style) {
								$($this).attr("style", style);
							}
							brush_item.append($($this));
						}
					}
				});
			}
			obj.find("p").each(function(i) {
				if (
					$(this).html() == "" ||
					$(this).html() == "&nbsp;" ||
					$(this).html() == "<br>" ||
					$(this).html() == "<br/>"
				) {
					if (typeof $(this).attr("style") == "undefined") {
						$(this).remove();
					}
				}
			});
		}
		html = obj.html();
		current_editor.execCommand("insertHtml", html);
		current_editor.undoManger.save();
		return true;
	}
	current_editor.execCommand("insertHtml", html);
	current_editor.undoManger.save();
	return true;
}
function setBackgroundColor(bgcolor, color, history) {
	if (isGreyColor(bgcolor)) {
		return false;
	}
	if (history) {
		current_editor.undoManger.save();
	}
	if (!$("#replace-color-all")[0].checked && current_active_wechat_item) {
		parseObject(current_active_wechat_item, bgcolor, color);
		current_active_wechat_item.attr("data-color", bgcolor);
		current_active_wechat_item.attr("data-custom", bgcolor);
		current_editor.undoManger.save();
		return;
	} else {
		if (!$("#replace-color-all")[0].checked) {
			return;
		}
		clearHelper();
		parseObject($(current_editor.selection.document), bgcolor, color);
		clearInterval(replace_interval);
		replace_interval = setInterval(function() {
			$("#replace-color-all").attr("checked", false);
		}, 15000);
		$(current_editor.selection.document)
			.find(".recommend-style-content")
			.each(function() {
				$(this).attr("data-color", bgcolor);
			});
	}
	if (history) {
		current_editor.undoManger.save();
	}
	return;
}
function parseObject(obj, bgcolor, color) {
	if (isGreyColor(bgcolor)) {
		return false;
	}
	obj.find("*").each(function() {
		if (this.nodeName == "HR" || this.nodeName == "hr") {
			$(this).css("border-color", bgcolor);
			return;
		}
		if (this.nodeName == "") {
			return;
		}
		if ($(this).hasClass("recommend-style-content") && $(this).attr("data-custom")) {
			return;
		}
		if ($("#replace-color-all")[0].checked) {
			var styleContents = $(this).parents(".recommend-style-content");
			for (var i = 0; i < styleContents.size(); i++) {
				if (styleContents.eq(i).attr("data-custom")) {
					return;
				}
			}
		}
		if ($(this).data("ct") == "fix") {
			return;
		}
		var bgimg = $(this).css("backgroundImage");
		if (bgimg.substring(0, 24) == "-webkit-linear-gradient(") {
			var colors;
			var type;
			if (bgimg.substring(0, 30) == "-webkit-linear-gradient(left, ") {
				type = "left";
				colors = bgimg.substring(30, bgimg.length - 1);
			} else if (
				bgimg.substring(0, 29) == "-webkit-linear-gradient(top, "
			) {
				type = "top";
				colors = bgimg.substring(29, bgimg.length - 1);
			} else if (
				bgimg.substring(0, 31) == "-webkit-linear-gradient(right, "
			) {
				type = "right";
				colors = bgimg.substring(31, bgimg.length - 1);
			} else if (
				bgimg.substring(0, 32) == "-webkit-linear-gradient(bottom, "
			) {
				type = "bottom";
				colors = bgimg.substring(32, bgimg.length - 1);
			}
			if (colors) {
				var color_arr = colors.split("),");
				var txt_color, gradient_color, main_color;
				if (isLightenColor(bgcolor)) {
					txt_color = getColor(rgb2hex(bgcolor), "darken", "50%");
					txt_color = getColor(rgb2hex(txt_color), "saturate", "30%");
					gradient_color = getColor(
						rgb2hex(bgcolor),
						"darken",
						"10%"
					);
					main_color = getColor(rgb2hex(bgcolor), "saturate", "20%");
				} else {
					txt_color = "#FFFFFF";
					getColor(rgb2hex(bgcolor), "lighten", "50%");
					gradient_color = getColor(
						rgb2hex(bgcolor),
						"lighten",
						"10%"
					);
					main_color = getColor(rgb2hex(bgcolor), "lighten", "5%");
					main_color = getColor(
						rgb2hex(main_color),
						"desaturate",
						"10%"
					);
					main_color = getColor(rgb2hex(main_color), "fadein", "20%");
				}
				if (color_arr.length == 3) {
					$(this).css(
						"backgroundImage",
						"-webkit-linear-gradient(" +
							type +
							", " +
							main_color +
							", " +
							gradient_color +
							", " +
							main_color +
							")"
					);
					$(this).css("color", txt_color);
				} else if (color_arr.length == 2) {
					$(this).css(
						"backgroundImage",
						"-webkit-linear-gradient(" +
							type +
							", " +
							main_color +
							", " +
							gradient_color +
							")"
					);
					$(this).css("color", txt_color);
				}
			}
		}
		var persent = $(this).data("clessp") ? $(this).data("clessp") : "50%";
		var hasSetBgColor = false;
		var bgC = $(this).get(0).style.backgroundColor;
		if (!bgC || bgC === "initial" || bgC === "transparent" || bgC === "") {
			var fc = $(this).get(0).style.color;
			if (fc && fc != "" && fc != "inherit" && !isGreyColor(fc)) {
				var txt_color;
				if (isLightenColor(bgcolor)) {
					txt_color = getColor(rgb2hex(bgcolor), "darken", persent);
					$(this).css("color", txt_color);
				} else {
					$(this).css("color", bgcolor);
				}
			}
		} else {
			if ($(this).data("bgless")) {
				var bgpersent = $(this).data("bglessp")
					? $(this).data("bglessp")
					: "30%";
				var bg_color;
				if (
					$(this).data("bgless") == "true" ||
					$(this).data("bgless") == true
				) {
					if (isLightenColor(bgcolor)) {
						bg_color = getColor(
							rgb2hex(bgcolor),
							"darken",
							bgpersent
						);
						bg_color = getColor(
							rgb2hex(bg_color),
							"saturate",
							"20%"
						);
					} else {
						bg_color = getColor(
							rgb2hex(bgcolor),
							"lighten",
							bgpersent
						);
					}
				} else {
					bg_color = getColor(
						rgb2hex(bgcolor),
						$(this).data("bgless"),
						bgpersent
					);
				}
				if (isLightenColor(bg_color)) {
					txt_color = getColor(rgb2hex(bg_color), "darken", persent);
				} else {
					txt_color = color;
				}
				hasSetBgColor = true;
				$(this).css("backgroundColor", bg_color);
				$(this).css("color", txt_color);
			} else if (!isGreyColor(bgC)) {
				hasSetBgColor = true;
				$(this).css("backgroundColor", bgcolor);
				var txt_color;
				if (isLightenColor(bgcolor)) {
					txt_color = getColor(rgb2hex(bgcolor), "darken", persent);
				} else {
					txt_color = color;
				}
				$(this).css("color", txt_color);
			} else {
				var fc = $(this).get(0).style.color;
				if (fc && fc != "" && fc != "inherit" && !isGreyColor(fc)) {
					$(this).css("color", bgcolor);
				}
			}
		}
		if ($(this).data("bcless") || hasSetBgColor) {
			var bc_color;
			if (isLightenColor(bgcolor) || $(this).data("bcless") == "darken") {
				var persent = $(this).data("bclessp")
					? $(this).data("bclessp")
					: "5%";
				bc_color = getColor(rgb2hex(bgcolor), "darken", persent);
				bc_color = getColor(rgb2hex(bc_color), "saturate", "30%");
			} else {
				var persent = $(this).data("bclessp")
					? $(this).data("bclessp")
					: "20%";
				bc_color = getColor(rgb2hex(bgcolor), "lighten", persent);
				bc_color = getColor(rgb2hex(bc_color), "desaturate", "20%");
				bc_color = getColor(rgb2hex(bc_color), "fadein", "20%");
			}
			if (
				this.style.borderBottomColor ||
				this.style.borderTopColor ||
				this.style.borderLeftColor ||
				this.style.borderRightColor
			) {
				if (this.style.borderBottomColor != "transparent") {
					this.style.borderBottomColor = bc_color;
				}
				if (this.style.borderTopColor != "transparent") {
					this.style.borderTopColor = bc_color;
				}
				if (this.style.borderLeftColor != "transparent") {
					this.style.borderLeftColor = bc_color;
				}
				if (this.style.borderRightColor != "transparent") {
					this.style.borderRightColor = bc_color;
				}
			} else {
				this.style.borderColor = bc_color;
			}
		} else {
			if (
				this.style.borderBottomColor ||
				this.style.borderTopColor ||
				this.style.borderLeftColor ||
				this.style.borderRightColor
			) {
				setColor(this, "borderBottomColor", bgcolor);
				setColor(this, "borderTopColor", bgcolor);
				setColor(this, "borderLeftColor", bgcolor);
				setColor(this, "borderRightColor", bgcolor);
			} else {
				setColor(this, "borderColor", bgcolor);
			}
		}
	});
	obj.find("*").each(function() {
		var fc = $(this).css("color");
		$(this).find("*").each(function() {
			var nfc = $(this).css("color");
			if (nfc == fc) {
				$(this).css("color", "inherit");
			}
		});
	});
	return obj;
}
function parseHtml(html, bgcolor, color) {
	var obj = $('<div id="editor-content">' + html + "</div>");
	obj = parseObject(obj, bgcolor, color);
	var result = obj.html();
	obj = null;
	return result;
}
function setColor(obj, colorType, color) {
	var c = $(obj).css(colorType);
	if (c === "transparent") {
		return;
	} else {
		if (!isGreyColor(c)) {
			$(obj).css(colorType, color);
		}
	}
}
function rgb2hex(color) {
	rgb = color.match(
		/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
	);
	return rgb && rgb.length === 4
		? "#" +
				("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
		: color;
}
function isLightenColor(color) {
	var c = rgb2hex(color);
	var r = "" + c.substring(1, 3);
	var g = "" + c.substring(3, 5);
	var b = "" + c.substring(5, 7);
	if (r > "C0" && g > "C0" && b > "C0") {
		return true;
	} else {
		return false;
	}
}
function isGreyColor(color) {
	var c = rgb2hex(color);
	var r = "" + c.substring(1, 3);
	var g = "" + c.substring(3, 5);
	var b = "" + c.substring(5, 7);
	if (r == g && g == b) {
		return true;
	} else {
		return false;
	}
}

var less_parser = new less.Parser;
function getColor(color, type, num) {
	var str = "";
	less_parser.parse(
		"*{color:" + type + "(" + color + "," + num + ")}",
		function(err, tree) {
			str = tree.toCSS();
			str = str
				.replace(/\n/g, "")
				.replace(/ /g, "")
				.replace("*{color:", "")
				.replace(";}", "");
		}
	);
	return str;
}

// 段落
function applyParagraph(type) {
	var object;
	if (type == "all") {
		var editor_document = current_editor.selection.document;
		object = $(editor_document);
	} else {
		if (!current_active_wechat_item) return;
		object = current_active_wechat_item;
	}
	$(object).find("p").each(function() {
		$(this).css("lineHeight", $("#paragraph-lineHeight").val());
		$(this).css("fontFamily", $("#paragraph-fontFamily").val());
		$(this).css("fontSize", $("#paragraph-fontSize").val());
		$(this).css("textIndent", $("#paragraph-textIndent").val());
		$(this).css("paddingTop", $("#paragraph-paddingTop").val());
		$(this).css("paddingBottom", $("#paragraph-paddingBottom").val());
	});
}
// 隐藏弹出框
function clearHelper() {
	var editor_document = current_editor.selection.document;
   	$(editor_document).find(".recommend-style-content").each(function() {
		$(this).css({ border: "0 none", padding: 0 });
   	});
}


var publishController = {
	_crontroller: "questions",
	dialogid: null,
	overlays: {},
	loading_html: '<img src="/img/ajax/wheel_throbber.gif"> 正在加载...',
	open_dialog: function(url, options, postdata) {
		var $dialog = this;
		$dialog.loading_html =
			'<img src="' + BASEURL + '/img/ajax/wheel_throbber.gif"> 正在加载...';
		var lastid = $dialog.dialogid;
		$dialog.dialogid =
			url.replace(/\/|\.|:|,| |\?|=|&/g, "_") + "-ajax—action";
		if ($dialog.dialogid != lastid) {
			$("#" + lastid).modal("hide");
		}
		$("#" + $dialog.dialogid)
			.find(".modal-body")
			.html($dialog.loading_html);
		function dialog_loaded() {
			$(".nav-tabs a", "#" + $dialog.dialogid).click(function(e) {
				e.preventDefault();
				$(this).blur();
				$(this).tab("show");
			});
			$(".nav-tabs a:first", "#" + $dialog.dialogid).tab("show");
			$(".dropdown-toggle", "#" + $dialog.dialogid).dropdown();
			$("button", "#" + $dialog.dialogid).addClass("btn");
			if (typeof options.callback == "function") {
				options.callback($("#" + $dialog.dialogid));
			}
			$("#" + $dialog.dialogid).find("form").each(function() {
				if (typeof $(this).attr("onsubmit") == "undefined") {
					if ($.fn.validate) {
						validateForm(this);
					} else {
						$(this).on("submit", function() {
							ajaxSubmitForm(this, function(request) {
								if (request.success) {
									$("#" + $dialog.dialogid).modal("hide");
								}
							});
							return false;
						});
					}
				}
			});
		}
		function load_url() {
			dialog_loaded();
			page_loaded();
			$("#" + $dialog.dialogid).find("a").click(function() {
				var url = $(this).attr("href");
				var re = /^#/;
				if (
					typeof $(this).attr("onclick") != "undefined" ||
					$(this).attr("target") == "_blank" ||
					re.test(url) ||
					url.substr(0, 10).toLowerCase() == "javascript"
				) {
					return true;
				}
				$("#" + $dialog.dialogid)
					.find(".modal-body")
					.load(url, function() {
						load_url();
					});
				return false;
			});
		}
		if ($("#" + $dialog.dialogid).size() < 1) {
			$(
				'<div  class="modal fade" id="' +
					$dialog.dialogid +
					'"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3 id="myModalLabel">' +
					options.title +
					'</h3></div><div class="modal-body">' +
					$dialog.loading_html +
					"</div></div></div></div>"
			).appendTo("body");
		}
		if (postdata != null) {
			$.ajax({
				type: "post",
				url: url,
				data: postdata,
				complete: function(XMLHttpRequest, textStatus) {},
				success: function(html) {
					if (
						options.selector &&
						$(html).find(options.selector).size() > 0
					) {
						$("#" + $dialog.dialogid)
							.find(".modal-body")
							.html($(html).find(options.selector).html());
					} else {
						$("#" + $dialog.dialogid)
							.find(".modal-body")
							.html(html);
					}
					load_url();
				},
				dataType: "html"
			});
		} else {
			if (options.selector) {
				var obj = $("#" + $dialog.dialogid)
					.find(".modal-body")
					.load(url + " " + options.selector, {}, function() {
						load_url();
					});
			} else {
				var obj = $("#" + $dialog.dialogid)
					.find(".modal-body")
					.load(url, {}, function() {
						load_url();
					});
			}
		}
		$("#" + $dialog.dialogid).modal("show");
		if (options.width) {
			$("#" + $dialog.dialogid + " .modal-dialog").width(options.width);
		}
		if (options.zIndex) {
			$("#" + $dialog.dialogid).css("z-index", options.zIndex);
		}
		return false;
	},
	load_url: function(url, selector) {
		var $dialog = this;
		var re = /^#/;
		if (re.test(url) || url.substr(0, 10).toLowerCase() == "javascript") {
			return false;
		}
		if (selector) {
			url += " " + selector;
		}
		$("#" + $dialog.dialogid).load(url, function() {
			$("#" + $dialog.dialogid).find("a").click(function() {
				$dialog.load_url($(this).attr("href"), {});
				return false;
			});
			page_loaded();
		});
	},
	remove: function() {
		if (this.dialogid) {
			$("#" + this.dialogid).remove();
		}
	},
	close_dialog: function() {
		if (this.dialogid) {
			$("#" + this.dialogid).modal("hide");
		}
	},
	open_html_dialog: function(dialogid) {
		this.dialogid = dialogid;
		$("#" + dialogid).modal("show");
	},
	invite_tabs: {}
};

// 显示成功消息栏
function showSuccessMessage(text) {
	if ($.fn.jGrowl) {
		$.jGrowl("<i class='fa fa-check'></i> " + text, {
			theme: "alert alert-success",
			pool: 2,
			closer: false,
			life: 3000,
			closerTemplate: "",
			themeState: "",
			position: "top-right",
			closeTemplate: ""
		});
	} else {
		alert(text);
	}
	return true;
}
// 显示失败消息栏
function showErrorMessage(text) {
	if ($.fn.jGrowl) {
		$.jGrowl("<i class='fa fa-warning'></i> " + text, {
			theme: "alert alert-danger",
			position: "top-right",
			pool: 2,
			closer: false,
			closerTemplate: "",
			life: 5000,
			themeState: "",
			closeTemplate: ""
		});
	} else {
		alert(text);
	}
	return true;
}
// 初始化
function page_loaded() {
	$(".popover-trigger").popover({ trigger: "hover" });
	$(".ui-portlet-content").each(function() {
		if (jQuery.trim($(this).html()) == "") {
			$(this).parent(".ui-portlet").hide();
		}
	});
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
}

// 获取
current_editor = UE.getEditor('WxMsgContent');
current_editor.ready(function () {
	$('.edui-editor-toolbarbox [title]').tooltip({placement: 'bottom', container: 'body'});
	setTimeout(function () {
		current_editor.execCommand('focus');
		var editor_document = current_editor.selection.document;
		if (window.localStorage) { // 本地临时存储编辑器内容
			var localContent = window.localStorage.getItem('_localWXContent'),
				currentEditMsgId = window.localStorage.getItem('_edit_msg_id');
			if (localContent) {
				setEditorHtml(localContent);
				$(editor_document).find('.recommend-style-content').each(function () {
					$(this).css({ 'border': '0 none', 'padding': 0 });
				});
			}
			if (currentEditMsgId) {
				current_edit_msg_id = currentEditMsgId;
			}
			setInterval(function () {
				window.localStorage.setItem('_localWXContent', getEditorHtml());
			}, 10000);
		}
	}, 100);
});


$(function() {
	/**
	 * 初始化插件
	 */
	page_loaded();

	/**
	 * 窗口相关
	 */
	// resize editor area when resizing window
//	$(window).resize(function () {
//		// var win_height = $(window).height();
//		var win_height = $('#main-container').height();
//		$('#full-page').height(win_height);
//		var area_height = win_height - 150;
//
//		if (win_height < 800 && $(window).width() > 1300) {
//			//area_height = 800;
//			$('#full-page').addClass('small-height');
//			area_height += 50;
//		}
//		else {
//			$('#full-page').removeClass('small-height');
//		}
//		$('#WxMsgContent,.edui-editor-iframeholder').height(area_height - 20);
//		$('.item,categories-component').height(area_height);
//
//		$('.editor2').height(area_height + 65);
//
//		if ($(window).width() < $('body').width()) {
//			$('body').scrollLeft($('body').width() - $(window).width());
//		}
//	});

	// trigger resize
	setTimeout(function () {
		$(window).trigger('resize');
	}, 500);

	// alert before leaving current page -> 兼容性不好
	window.onbeforeunload = function (event) {
		var html = getEditorHtml();
		if (html != "") {
			if (window.localStorage) {
				window.localStorage.setItem('_localWXContent', html);
				window.localStorage.setItem('_edit_msg_id', current_edit_msg_id);
			}
			event.returnValue = "即将离开页面，是否确认编辑的内容已使用并废弃？";
		}
	}


	/**
	 * template, component 列表相关
	 */
	//切换分类时，回到顶部
	$('#style-categories .filter').click(function () {
		$('#insert-style-list').scrollTop(0);
	});

	// title template with ordered number
	$('.autonum').on('mousewheel', function (event) {
		var currentNum = parseInt($(this).html());
		if (event.deltaY < 0) { //向下滚动
			$(this).html(currentNum > 2 ? (currentNum - 1) : 1);
		} else {
			$(this).html(parseInt($(this).html()) + 1);
		}
		return false;
	}).tooltip({ 'title': '上下滚动鼠标，可调整序号大小', container: 'body' });

	// mix it up
	$('.editor-component-list > li').addClass('mix');
	$('.editor-component-list').mixItUp({
		layout: { display: 'block' },
		callbacks: {}
	});

	// 点击插入 component 列表元素
	$('#insert-style-list').on('click', '.recommend-style', function () {

		if ($(this).hasClass('ignore')) {
			return false;
		}
		var ret = false;
		var num = parseInt($(this).find('.autonum:first').text());

		if (typeof num != "undefined") {
			$(this).find('.autonum:first').find('.autonum:first').text(num + 1);
		}
		var id = $(this).data('id');
		$(this).contents().filter(function () {
			return this.nodeType === 3 && $.trim($(this).text()) == "";
		}).remove();
		$(this).find('p').each(function () {
			if ($.trim($(this).html()) == "&nbsp;") {
				$(this).html('<br/>');
			}
		});
		$(this).find('*').each(function () {
			if ($(this).attr('data-width')) {
				return;
			}

			if (this.style.width && this.style.width != "") {
				$(this).attr('data-width', this.style.width);
			}
		});
		var style_item = $(this).find('.recommend-style-content:first');

		//多插入一个空行，防止有时无法选择到底部了，或者两个元素中间不方便插入内容。
		if (style_item.size()) {
			// insertHtml( $(this).html() + "<p>&nbsp;</p>"); 包含收藏夹的删除按钮等
			ret = insertHtml("<section data-id=\"" + id + "\"  style=\"border:0 none;\" class=\"recommend-style-content\">" + style_item.html() + "</section>");
		}
		else { //最外围包装recommend-style-content容器
			ret = insertHtml("<section data-id=\"" + id + "\"  style=\"border:0 none;\" class=\"recommend-style-content\">" + $(this).html() + "</section>");
		}

		if (ret) {
			if (typeof num != "undefined") {
				$(this).find('.autonum:first').text(num + 1);
			}
				// style_click($(this).data('id'));
		}

	});

	// 点击插入 template 列表元素
	$('#insert-template-list').on('click', '.insert-tpl-content', function() {
		var parent = $(this).parents('.template-item');
		if (parent.hasClass('ignore')) {
			return false;
		}
		parent.contents().filter(function () {
			return this.nodeType === 3 && $.trim(parent.text()) == "";
		}).remove();
		parent.find('p').each(function () {
			if ($.trim(parent.html()) == "&nbsp;") {
				parent.html('<br/>');
			}
		});
		parent.find('*').each(function () {
			if (parent.attr('data-width')) {
				return;
			}

			if (this.style.width && this.style.width != "") {
				parent.attr('data-width', this.style.width);
			}
		});
		var template_item = parent.find('.editor-template-content:first');
		var tplId = template_item.attr('data-id');
		// console.log(tplId);
		insertHtml(template_item.html());
	});

	/**
	 * 工具相关
	 */
	// color picker相关
	$('.colorPicker').colorPicker({
		customBG: '#FFF',
		init: function (elm, colors) { // colors is a different instance (not connected to colorPicker)
			elm.style.backgroundColor = elm.value;
			elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
		}
		/*,displayCallback:function(colors, mode, options){
			setBackgroundColor($(this).val(),'#FFF', 'all');
		}*/
	});
	$('.colorPicker').blur(function () {
		setBackgroundColor(this.value, '#FFF', true);
		this.style.backgroundColor = this.value;
		this.style.color = '#FFF';
	});
	$('.colorPicker').keyup(function () {
		if (this.value.search('#') == 0) {
			if (this.value.length == 7) { //|| this.value.length ==4
				$(this).trigger('focus.colorPicker');
			}
		}
		else {
			//alert(this.value.search('rgb'));alert(this.value.indexOf(")"));
			if (this.value.search('rgb') == 0 && this.value.indexOf(")") > 0) {
				$(this).trigger('focus.colorPicker');
			}
		}
	});

	// 配色方案中改变配色
	$('.color-swatch').click(function () {
		$('.color-swatch').removeClass('active');
		$(this).addClass('active');
		var color = $(this).data('color'); //data-color为前景色，bgcolor为背景色，或者无背景文字的前景色
		var bgcolor = $(this).css('backgroundColor');

		$('#custom-color-text').val(bgcolor).css('backgroundColor', bgcolor);

		if (!color) color = '#FFF';
		setBackgroundColor(bgcolor, color, true);
		if (!current_active_wechat_item) {
			$('.editor-component-list li > .recommend-style-content').each(function () {
				parseObject($(this), bgcolor, color);
				$(this).attr('data-color', bgcolor);
			});
		}
	});

	// 去阴影
	$('#flat-strip-shadow').click(function () {
		var html = getEditorHtml();
		var obj = $('<div>' + html + '</div>');
		obj.find('*').css('box-shadow', '');
		var newHtml = obj.html();
		setEditorHtml(newHtml);
	});

	// 加阴影
	$('#flat-add-shadow').click(function () {
		var html = getEditorHtml();
		var obj = $('<div>' + html + '</div>');

		obj.find('*').each(function () {
			if ($(this).css('background-color') == 'transparent' || $(this).css('background-color') == '') {
			}
			else {
				$(this).css('box-shadow', 'rgba(205, 205, 205,0.9) 2px 3px 2px');
			}
		});
		obj.find('hr').each(function () {
			$(this).css('box-shadow', 'rgba(205, 205, 205,0.9) 1px 1px 2px');
		})
		var newHtml = obj.html();
		setEditorHtml(newHtml);
	});

	// 设置图片圆角
	$('#set-image-radius').click(function () {
		var html = getDealingHtml();
		var obj = $('<div>' + html + '</div>');
		obj.find('img').css('border-radius', '50%');
		setDealingHtml(obj.html())
		obj = null;
	});

	// 设置图片边框
	$('#set-image-border').click(function () {
		var html = getDealingHtml();
		var obj = $('<div>' + html + '</div>');
		obj.find('img').css({ "background-color": "#fff", "border-radius": "4px", "max-width": "100%", "padding": "4px", "border": "1px solid #ddd" });
		setDealingHtml(obj.html())
		obj = null;
	})

	// 加圆角
	$('#flat-add-radius').click(function () {
		var html = getDealingHtml();
		var obj = $('<div>' + html + '</div>');
		obj.find('*').each(function () {
			if ($(this).css('background-color') != 'transparent' && $(this).css('background-color') != '') {
				$(this).css('border-radius', '4px');
			}
		});
		setDealingHtml(obj.html())
		obj = null;
	});

	// 去圆角
	$('#flat-strip-radius').click(function () {
		var html = getDealingHtml();
		var obj = $('<div>' + html + '</div>');
		obj.find('*').css('border-radius', '');
		setDealingHtml(obj.html())
		obj = null;
	});

	// 去边框
	$('#flat-strip-border').click(function () {
		var html = getDealingHtml();
		var obj = $('<div>' + html + '</div>');

		obj.find('*').each(function () {
			//if( $(this).css('background-color') == 'transparent' ||  $(this).css('background-color') == ''  ){
			//}
			//else{
			$(this).css('border', '');
			$(this).css('border-width', '0');
			//}
		});

		setDealingHtml(obj.html())
		obj = null;
	})

	// 随机旋转角度
	$('#item-random-transform').click(function () {
		var editor_document = current_editor.selection.document;
		var deg = parseInt(Math.random() * 8);
		var f = Math.random() * 10 > 5 ? '+' : '-';
		$(editor_document).find('.recommend-style-content').each(function (i) {
			if ((i + 1) % 3 == 0) {
				deg = parseInt(Math.random() * 8);
				f = Math.random() * 10 > 5 ? '+' : '-';
			}
			$(this).css('transform', 'rotate(' + f + deg + 'deg)').css('-webkit-transform', 'rotate(' + f + deg + 'deg)');
		});
	});

	// 随机变化颜色
	$('#item-random-color').click(function () {
		var html = getDealingHtml();
		var obj = $('<div>' + html + '</div>');
		var bgcolors = ['#5BB75B', '#2E8BCC', '#F09609', '#E51400', '#7B4F9D', '#E671B8', '#008641', '#20608E', '#FFC40D'];

		var rd = Math.floor(Math.random() * (bgcolors.length));
		var used = [];
		var current_bgcolor = bgcolors[rd];
		var components = obj.find('.recommend-style-content').each(function (i) {
			if (i % random_color_step == 0) {
				do {
					rd = Math.floor(Math.random() * (bgcolors.length));
				}
				while (jQuery.inArray(rd, used) != -1);

				used[used.length] = rd;
				if (used.length == bgcolors.length) {
					used = [];
				}

				current_bgcolor = bgcolors[rd];
			}
			$(this).html(parseHtml($(this).html(), current_bgcolor, current_select_color));
		});

		setDealingHtml(obj.html())
		obj = null;
	});

	// color panel
	$('#right-fix-tab-color').click(function() {
		$(this).toggleClass('active');
		$('#colorPanelContainer').slideToggle();
	})

	// 清空编辑器
	$('#clear-editor').click(function () {
		if (confirm('是否确认清空内容，清空后内容将无法恢复')) {
			current_edit_msg_id = null;
			setEditorHtml("");
		}
	});

	// 复制全文
	var client_copyall = new ZeroClipboard($('#copy-editor'));
	client_copyall.on('ready', function (event) {
		client_copyall.on('copy', function (event) {
			event.clipboardData.setData('text/html', getEditorHtml());
			event.clipboardData.setData('text/plain', getEditorHtml());
			showSuccessMessage("已成功复制到剪切板");
		});
		client_copyall.on('mouseover', function () {
			$('#copy-editor').tooltip({ trigger: 'manual', title: "复制全文", placement: 'right', container: 'body' }).tooltip('show');
		});
		client_copyall.on('mouseout', function () {
			$('#copy-editor').tooltip('hide');
		});
	});

	// 复制文本
	var client_copytext = new ZeroClipboard($('#copy-text'));
	client_copytext.on('ready', function (event) {
		client_copytext.on('copy', function (event) {
			event.clipboardData.setData('text/html', current_editor.getPlainTxt());
			event.clipboardData.setData('text/plain', current_editor.getPlainTxt());
			showSuccessMessage("已成功复制到剪切板");
		});
		client_copytext.on('mouseover', function () {
			$('#copy-text').tooltip({ trigger: 'manual', title: "复制文本", placement: 'right', container: 'body' }).tooltip('show');
		});
		client_copytext.on('mouseout', function () {
			$('#copy-text').tooltip('hide');
		});
	});

	// 预览
	$('#preview-editor').click(function () {
		$('#preview-msg-content').html(getEditorHtml());
		publishController.open_html_dialog('preview-msg');
	});

});