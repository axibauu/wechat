package com.gpower.modules.data.service.impl;

import cn.hutool.json.JSONArray;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.DateUtil;
import com.gpower.common.utils.RedisUtil;
import com.gpower.common.utils.StringUtil;
import com.gpower.modules.data.entity.Details;
import com.gpower.modules.data.entity.WbInfo;
import com.gpower.modules.data.entity.WxData;
import com.gpower.modules.data.service.DataService;
import com.gpower.modules.data.service.WbDataService;
import com.gpower.modules.data.service.WxDataService;
import com.gpower.modules.data.service.WxDetailService;
import com.gpower.modules.wb.entity.WbAccount;
import com.gpower.modules.wb.service.WbAccountService;
import com.gpower.modules.wx.dao.WxContentDao;
import com.gpower.modules.wx.entity.UserWx;
import com.gpower.modules.wx.entity.WxAccount;
import com.gpower.modules.wx.entity.WxArticleInfo;
import com.gpower.modules.wx.entity.WxContent;
import com.gpower.modules.wx.service.WxAccountService;
import com.gpower.modules.wx.service.WxContentService;
import com.gpower.modules.wx.util.WxUtils;
import org.apache.commons.lang.time.DateUtils;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.gpower.modules.wx.util.WbUtils.getUserShow;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-05 17:40
 */
@Service
public class DataServiceImpl implements DataService {
    @Autowired
    WbAccountService wbAccountService;
    @Autowired
    WxAccountService wxAccountService;
    @Autowired
    WxContentService wxContentService;
    @Autowired
    WbDataService wbDataService;
    @Autowired
    WxDataService WxDataService;
    @Autowired
    WxDetailService wxDetailService;
    @Autowired
    WxContentDao wxContentDao;


    @Override
    public List <WbInfo> getUserDetail(String list, String time, String fromtime, String totime) {
        /*查询所有微博*/
        List <WbInfo> ls = new ArrayList();

        if ("-1".equals(list)) {
            IPage<WbAccount> wbAccountIPage = wbAccountService.queryPage(1, 1000);
            List <WbAccount> list1 = (List <WbAccount>) wbAccountIPage.getRecords();
            list1.stream().forEach(li -> {
                String token = li.getToken();
                String id = li.getId();
                String uid = li.getUid();
                WbInfo wbdata = wbDataService.getOne(new QueryWrapper <WbInfo>().eq("wbaccountID", li.getId()));
    if(wbdata==null){
    throw new GpException("正在抓取数据,请稍后再试");
}else{
    wbdata= wbDataService.getOne(new QueryWrapper <WbInfo>().eq("wbaccountID",
            li.getId()));  ls.add(wbdata);
}


            });
        } else {
            WbAccount byId = wbAccountService.getById(list);
            WbInfo wbdata = wbDataService.getOne(new QueryWrapper <WbInfo>().eq("wbaccountID",
                    list));
            if(wbdata==null){
                throw new GpException("正在抓取数据,请稍后再试");

            }


            ls.add(wbdata);

        }



        return ls;
    }

    @Override
    public List <WxData> getArticleImageDetail(String list, String time, String fromtime, String totime) {
        List<String> collect=new ArrayList<>();
        if ("-1".equals(list)) {
            List <WxAccount> list1= wxAccountService.list(new QueryWrapper <WxAccount>());
            collect = list1.stream().map(WxAccount::getId).collect(Collectors.toList());

        }else{
            WxAccount byId = wxAccountService.getById(list);
            String id = byId.getId();
            collect.add(id);
        }
        List <WxData> wxDatas =new ArrayList <>();
        List <WxData> wxData =new ArrayList <>();
        List <WxContent> wxcontentList =
                wxContentService.list(new QueryWrapper <WxContent>().in("wxAccountID",
                        collect).in("type", new Integer[]{2,3}).eq("status",
                        WxContent.STATUS_PUBLISHED).orderByDesc("createDate"));


        if(wxcontentList!=null&&wxcontentList.size()>0){
        for (int i = 0; i < wxcontentList.size(); i++) {

            WxContent wxContent = wxcontentList.get(i);

            wxData = WxDataService.list(new QueryWrapper <WxData>().eq("wxaccountID",
                    wxContent.getWxAccountID()).eq("wxcontentID", wxContent.getId()));
    if(wxData!=null&&wxData.size()>0){
    for (int i1 = 0; i1 < wxData.size(); i1++) {
        List <Details> Details = wxDetailService.list(new QueryWrapper <Details>().eq(
                "wxaccountID",
                wxContent.getWxAccountID()).eq("msgid", wxData.get(i1).getMsgid()));
        Collections.sort(Details,new Comparator<Details>(){
            @Override
            public int compare(com.gpower.modules.data.entity.Details o1, com.gpower.modules.data.entity.Details o2) {

                return    o1.getStatdate().compareTo(o2.getStatdate());
            }
        });



        if("3".equals(time)){

                if(Details.size()>3){
                    Details= (Details.subList(Details.size()-4,
                            Details.size()-1));
                }
        }else if ("5".equals(time)){
            if(Details.size()>6){
                Details= (Details.subList(Details.size()-6,
                        Details.size()-1));
            }


        }
        wxData.get(i1).setDetails(Details);



    }

}
            wxDatas.addAll(wxData);
        }


        }

        System.out.println("wxDatas---"+wxDatas.size());


            return  wxDatas;






    }

    @Override
    public List <WbInfo> getAllWbData() {

        return null;
    }
}
