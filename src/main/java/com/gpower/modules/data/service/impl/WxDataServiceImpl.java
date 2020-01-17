package com.gpower.modules.data.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.data.dao.WxDataDao;
import com.gpower.modules.data.entity.WxData;
import com.gpower.modules.data.service.WxDataService;
import com.gpower.modules.wb.dao.WbAccountDao;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-30 15:07
 */
@Service("wxDataService")
public class WxDataServiceImpl  extends ServiceImpl <WxDataDao, WxData> implements WxDataService {
}
