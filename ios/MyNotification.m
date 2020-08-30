//
//  MyNotification.m
//  WeatherApp
//
//  Created by Natalia Volkova on 20/08/2020.
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import "MyNotification.h"

@implementation MyNotification

// This makes our module be accessible from JS. You can provide string argument, which will be the name accessible from JS.
// Otherwise the class name will be used (here: MyNotification)
RCT_EXPORT_MODULE()


// This is how we're exporting methods to JS.
// First argument is the name of a function, the rest are arguments
RCT_EXPORT_METHOD(showNotification:(NSString *)title location:(NSString *)body)
{
    UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
    content.title = title;
    content.body = body;
    content.sound = UNNotificationSound.defaultSound;

    UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger
                                                  triggerWithTimeInterval:0.1f
                                                  repeats:NO];

    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"requestName"
                                                                          content:content
                                                                          trigger:trigger];


    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    dispatch_async(dispatch_get_main_queue(), ^{

      [center addNotificationRequest:request withCompletionHandler:nil];

    });
}

// Exporting method, used by RN
- (NSDictionary *)constantsToExport
{
  return @{ @"notificationDelay": @5 };
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;  // YES if needed to initialize on main thread (for example, initialization relies on calling UIKit), NO otherwise
}

@end
