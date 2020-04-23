Delivery Boy is an android app and as the name itself describes what it can be used for. This app has three screens, first one displays list of orders whose delivery is to be done, second one contains orders that are to be picked up from the buyers if they have initiated any return and the last screen shows the report containing count of deliveries or pick up done successfully or any of these two failed due to some reason like 'Unable to Locate Address' along with the details of the delivery. 

All the three screens contains dynamic data coming from firebase real time DB, and the input done by the user persists even after while navigating from one screen to another. 

Screen 1: Delivery

	1. It contains list of deliveries to be done.
	2. A delivery can be marked as successful by picking Delivery option from the picker on, before or after 15 mins of estimated delivery time.
	3. A delivery can be marked as failed by picking any option other than delivery from the picker on, before or after 15 mins of estimated delivery time.
	4. Time up will be recorded as response if user do not gives any input within allowed time limit depending on the estimated delivery time.
	5. If a user tries to record a response before scheduled time that is even before of 15 mins before scheduled time then actual time to pass an input will be displayed on that delivery.

Screen 2: PickUp

	1. It contains list of Pick Ups to be done.
	2. A Pick Up can be marked as successful by picking Pick Up option from the picker on, before or after 15 mins of estimated Pick Up time.
	3. A Pick Up can be marked as failed by picking any option other than Pick Up from the picker on, before or after 15 mins of estimated Pick Up time.
	4. Time up will be recorded as response if user do not gives any input within allowed time limit depending on the estimated Pick Up time.
	5. If a user tries to record a response before scheduled time that is even before of 15 mins before scheduled time then actual time to pass an input will be displayed on that Pick Up.

Screen 3: Report

Report screen initially contains all the deliveries and pickup whose response is needs to be recorded. It has six sections.

1. Successful Delivery: It is populated when a delivery is done successfuly.
2. Successful Pick Up: It gets populated when a pick up is done successfuly.
3. Failed Delivery: This section will store data of unsuccessful deliveries with a valid reason that why it got failed when a delivery is marked as fail by the user.
4. Failed Pick Up: This section will store data of unsuccessful pick ups with a valid reason that why it got failed when a pick up is marked as fail by the user.
5. Delivery No Response: This section is initiated with the data same as Delivery screen. Data in it gets popped when a successful response(fail or success) is recorded by the user. If a delivery is not recorded with a valid input by user within given time limit then time up is displayed on that delivery or Response to be recorde is displayed.
6. Pick Up No Response: This section is initiated with the data same as Pick Up screen. Data in it gets popped when a successful response(fail or success) is recorded by the user. If a pick up is not recorded with a valid input by user within given time limit then time up is displayed on that delivery or Response to be recorde is displayed.
