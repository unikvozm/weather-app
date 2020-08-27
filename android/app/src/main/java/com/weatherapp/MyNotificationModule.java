package com.weatherapp;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class MyNotificationModule extends ReactContextBaseJavaModule {
    String notificationChannelId = "MyChannel";

    public MyNotificationModule(ReactApplicationContext context) {
        super(context);
        createNotificationChannel();
    }

    @Override
    public String getName() {
        // We will access this module as "MyNotification" in Javascript
        return "MyNotification";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("notificationDelay", 5);

        return constants;
    }

    // Annotated functions that will be accessible from JS, with the same name and signature
    @ReactMethod
    public void showNotification(String title, String content) {
        // implementation detail of this method
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getReactApplicationContext(), notificationChannelId)
                .setSmallIcon(android.R.drawable.arrow_up_float)
                .setContentTitle(title)
                .setContentText(content)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getReactApplicationContext());
        notificationManager.notify(666, builder.build()); // Show notification
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Our channel name";
            String description = "Channel description";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(notificationChannelId, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = getReactApplicationContext().getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}