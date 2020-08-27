package com.weatherapp;

import android.content.Context;
import android.graphics.Color;

import androidx.appcompat.widget.AppCompatButton;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class CustomButton extends AppCompatButton {

    public CustomButton(Context context) {
        super(context);
        this.setTextColor(Color.BLUE); // make a text color blue
        this.setOnClickListener(viewClicked -> { // set on click listener

            WritableMap event = Arguments.createMap(); // Create empty map for event data
            event.putString("action", "click"); // add entry to event

            ReactContext reactContext = (ReactContext) getContext();
            reactContext
                    .getJSModule(RCTEventEmitter.class)
                    .receiveEvent(
                            getId(), // Id of native view
                            "press", // Event's name
                            event // Event's data
                    );

        });
    }
}