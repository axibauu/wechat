package com.gpower.common.utils;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

public class SchedulerUtils {
	
	private static Scheduler scheduler = null;
	
	public static Scheduler getScheduler(){
		if(scheduler==null){
			SchedulerFactory schedulerFactory = new StdSchedulerFactory();
			try {
				scheduler = schedulerFactory.getScheduler();
			} catch (SchedulerException e) {
				e.printStackTrace();
			}
		}
		return scheduler;
	}
	
}
