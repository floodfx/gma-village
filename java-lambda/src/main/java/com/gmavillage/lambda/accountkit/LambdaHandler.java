package com.gmavillage.lambda.accountkit;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.util.CORS;
import com.gmavillage.lambda.util.DebugHelper;

public class LambdaHandler implements CORS {
	
	LambdaProxyOutput initAccountKit(LambdaProxyEvent event, Context context) {
		LambdaLogger logger = null;
		if(context != null) {
    		logger = context.getLogger();
    	}
		log(logger, "Received event:"+DebugHelper.toStringLambdaProxyEvent(event));
		String body = "Hello: ";
		switch(event.getHttpMethod()) {
		case "GET":
			body += "GET";
			break;
		default:
			body += "Default";
			
		}		
		return new LambdaProxyOutput(200, CORS.HEADERS, body);
	}
	
	private void log(LambdaLogger logger, String text) {
		if(logger != null) {
			logger.log(text);
		}
	}

}
