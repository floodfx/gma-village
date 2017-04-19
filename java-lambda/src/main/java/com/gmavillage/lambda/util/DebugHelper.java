package com.gmavillage.lambda.util;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;


public class DebugHelper {
	
	public static String toStringLambdaProxyEvent(LambdaProxyEvent event) {
		return ToStringBuilder.reflectionToString(event);
	}
	
	public static String toStringLambdaProxyOutput(LambdaProxyOutput out) {
		return ToStringBuilder.reflectionToString(out);
	}


}
