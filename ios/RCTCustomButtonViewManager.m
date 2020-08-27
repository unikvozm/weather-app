#import <React/RCTViewManager.h>
#import "CustomButton.h"

@interface RCTCustomButtonViewManager : RCTViewManager
@end

@implementation RCTCustomButtonViewManager

RCT_EXPORT_MODULE(CustomButton)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

- (UIButton *)view
{
    return [[CustomButton alloc] initWithFrame:CGRectZero];
}

RCT_CUSTOM_VIEW_PROPERTY(text, NSString, UIButton) {
    [view setTitle:json forState:UIControlStateNormal];
}

@end
