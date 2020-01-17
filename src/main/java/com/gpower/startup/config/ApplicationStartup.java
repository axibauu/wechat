package com.gpower.startup.config;

import com.gpower.common.utils.SchedulerUtils;
import com.gpower.common.utils.WorkSpaceConstants;
import com.gpower.modules.job.wb.WbDataJob;
import com.gpower.modules.job.wb.WbPublishJob;
import com.gpower.modules.job.wb.WbTokenjob;
import com.gpower.modules.job.wx.WxDetailJob;
import com.gpower.modules.job.wx.WxPublishJob;
import com.gpower.startup.cache.CacheProperties;
import com.gpower.startup.cache.GpCacheUtil;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {
    private static Logger log = LoggerFactory.getLogger(ApplicationStartup.class);

    @Value("${gpower.file.upload-path}")
    private String baseDir;

    @Value("${gpower.workspace.dir:gpowersoft}")
    private String gpowerName;

    @Value("${spring.jmx.default-domain}")
    private String domainName;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Environment env = event.getApplicationContext().getEnvironment();
        baseDir = baseDir + File.separator + gpowerName + File.separator + domainName;
        File gpowerDir = new File(baseDir);
        if (!gpowerDir.exists()) {
            gpowerDir.mkdirs();
        }
        WorkSpaceConstants.WORKSPACE = baseDir;
        log.info("WORKSPACE Path=" + WorkSpaceConstants.WORKSPACE);
        GpCacheUtil u = (GpCacheUtil) event.getApplicationContext().getBean(CacheProperties.MYBATISCACHENAME);
        u.clearAllCache();
        JobDetail wxPublishJobDetail = JobBuilder.newJob(WxPublishJob.class)
                .withDescription("this is a wxcontentpublish job")
                .withIdentity("WxPublish", "WxPublish")   // job 的name和group
                .build();

        /*
        * TriggerBuilder是一个泛型类，与JobBuilder有点不一样，
        * 而且创建触发器实例的动作委托给了ScheduleBuilder类.ScheduleBuilder，
        * 这次不顾名思义了，它作为一个生成器，不是要生成调度类，而是要生成MutableTrigger实例。*/
        Trigger wxPublishtrigger = TriggerBuilder.newTrigger()
                .withIdentity("WxPublish", "DEFAULT")
                .startAt(DateBuilder.futureDate(20, DateBuilder.IntervalUnit.SECOND))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInMinutes(1)
                        .repeatForever())
                .build();


        JobDetail wbDataJobDetail = JobBuilder.newJob(WbDataJob.class)
                .withDescription("this is a wbcontentpublish job")
                .withIdentity("WbDataJob", "WbDataJob")   // job 的name和group
                .build();


        Trigger wbDataJobtrigger = TriggerBuilder.newTrigger()
                .withIdentity("WbDataJob", "DEFAULT")
                .startAt(DateBuilder.futureDate(10, DateBuilder.IntervalUnit.SECOND))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInHours(4)
                        .repeatForever())
                .build();


/*微博发布*/
        JobDetail wbPublishJobDetail = JobBuilder.newJob(WbPublishJob.class)
                .withDescription("this is a wbcontentpublish job")
                .withIdentity("WbPublish", "WbPublish")   // job 的name和group
                .build();


        Trigger wbPublishtrigger = TriggerBuilder.newTrigger()
                .withIdentity("WbPublish", "DEFAULT")
                .startAt(DateBuilder.futureDate(10, DateBuilder.IntervalUnit.SECOND))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInMinutes(1)
                        .repeatForever())
                .build();

            /*微信数据抓取*/
        JobDetail wxdataPublishJobDetail = JobBuilder.newJob(WxDetailJob.class)
                .withDescription("this is a WxDetailJob job")
                .withIdentity("wxDetailJob", "wxDetailJob")   // job 的name和group
                .build();


        Trigger wxdatatrigger = TriggerBuilder.newTrigger()
                .withIdentity("wxDetailJob", "DEFAULT")
                .startAt(DateBuilder.futureDate(10, DateBuilder.IntervalUnit.SECOND))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInHours(12)
                        .repeatForever())
                .build();

        JobDetail WbTokenjobDetail = JobBuilder.newJob(WbTokenjob.class)
                .withDescription("this is a WbTokenjob job")
                .withIdentity("WbTokenjob", "WbTokenjob")   // job 的name和group
                .build();


        Trigger WbTokenjobtrigger = TriggerBuilder.newTrigger()
                .withIdentity("WbTokenjob", "DEFAULT")
                .startAt(DateBuilder.futureDate(20, DateBuilder.IntervalUnit.SECOND))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInMinutes(1)
                        .repeatForever())
                .build();



       Scheduler scheduler = SchedulerUtils.getScheduler();
        try {
         // scheduler.scheduleJob(wxPublishJobDetail, wxPublishtrigger);
           // scheduler.scheduleJob(wbPublishJobDetail, wbPublishtrigger);
            scheduler.scheduleJob(wbDataJobDetail, wbDataJobtrigger);
            scheduler.scheduleJob(wxdataPublishJobDetail, wxdatatrigger);
        /*    scheduler.scheduleJob(WbTokenjobDetail, WbTokenjobtrigger);*/


            //启动job

    // scheduler.start();
            log.info("微信发布定时任务启动");  log.info("微博发布定时任务启动");

            log.info("微信获取粉丝数据任务启动");
         /*   log.info("微博获取自动刷新获取token任务启动");
*/
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
