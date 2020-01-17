package com.gpower.modules.async;

import com.gpower.modules.email.entity.Email;
import org.springframework.scheduling.annotation.Async;

public interface AsyncTaskService {
    @Async
    void testMethod();

    @Async
    void sendMail(Email email);

}
