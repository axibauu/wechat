package com.gpower.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gpower.modules.log.entity.BehaviorRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class BehaviorRecordUtil {
	private static Logger log = LoggerFactory.getLogger(BehaviorRecordUtil.class);
	public static void store(BehaviorRecord br) throws JsonProcessingException {
		String json = br.toJson();
		// log.info(json);
	}
}
