package com.gpower.modules.data.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.data.dao.WxDataDao;
import com.gpower.modules.data.dao.WxDetailDao;
import com.gpower.modules.data.entity.Details;
import com.gpower.modules.data.entity.WxData;
import com.gpower.modules.data.service.WxDataService;
import com.gpower.modules.data.service.WxDetailService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-30 15:08
 */
@Service("wxDetailService")
public class WxDetailServiceImpl extends ServiceImpl <WxDetailDao, Details> implements WxDetailService {
}
