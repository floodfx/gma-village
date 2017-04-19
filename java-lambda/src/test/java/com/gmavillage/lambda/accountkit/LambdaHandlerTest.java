package com.gmavillage.lambda.accountkit;

import static org.junit.Assert.*;

import java.io.InputStreamReader;

import org.junit.Before;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.util.DebugHelper;
import com.google.common.io.CharStreams;
import com.google.gson.Gson;

public class LambdaHandlerTest {
	
	LambdaProxyEvent event;
	@Before
	public void loadEvent() throws Exception {
		String json = CharStreams.toString(new InputStreamReader(this.getClass().getResourceAsStream("test_LambdaProxyEvent.json")));
		System.out.println("JSON" + json);
		Gson gson = new Gson();
		event = gson.fromJson(json, LambdaProxyEvent.class);
	}

	@Test
	public void test() {
		LambdaHandler handler = new LambdaHandler();
		LambdaProxyOutput out = handler.initAccountKit(event, null);
		System.out.println("Out"+DebugHelper.toStringLambdaProxyOutput(out));
		assertNotNull(out);
		assertEquals("Hello: GET", out.getBody());
		
	}

}
