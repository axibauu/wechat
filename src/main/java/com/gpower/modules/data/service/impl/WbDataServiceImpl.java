package com.gpower.modules.data.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.modules.data.dao.WbDataDao;
import com.gpower.modules.data.entity.WbInfo;
import com.gpower.modules.data.service.WbDataService;
import com.gpower.modules.wb.dao.WbAccountDao;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-30 9:54
 */
@Service("WbDataService")
public class WbDataServiceImpl   extends ServiceImpl <WbDataDao, WbInfo> implements WbDataService  {
}
