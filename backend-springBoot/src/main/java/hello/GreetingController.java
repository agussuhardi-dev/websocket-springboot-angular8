package hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


    @MessageMapping("/hello") // app/hello
    @SendTo("/topic/greetings")
    public HelloMessage greeting(HelloMessage message){
//        Thread.sleep(1000); // simulated delay
//        return new Greeting(message.getName(), message.getMsg());

        return message;

//        Greeting greeting = new Greeting();
//        greeting.setName(message.getName());
//        greeting.setMessage(message.getMsg());
//
//        return greeting;

    }

}
