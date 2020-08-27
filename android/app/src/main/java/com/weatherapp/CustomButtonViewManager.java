package com.weatherapp;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class CustomButtonViewManager extends SimpleViewManager<CustomButton> {
    @Override
    public String getName() {
        return "CustomButton";
    }

    @Override
    protected CustomButton createViewInstance(ThemedReactContext reactContext) {
        return new CustomButton(reactContext);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "press",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onPress")
                        )
                ).build();
    }

    @ReactProp(name = "enabled") // handler for "enabled" prop
    public void setEnabled(CustomButton button, Boolean enabled) {
        button.setEnabled(enabled);
    }

    @ReactProp(name = "text") // handler for "text" prop
    public void setText(CustomButton button, String text) {
        button.setText(text);
    }
}