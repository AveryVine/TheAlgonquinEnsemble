class Database {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyBTbyrw8reBp48GGy6ijG3iExMwyUi8SUs",
            authDomain: "the-algonquin-ensemble.firebaseapp.com",
            projectId: "the-algonquin-ensemble"
        });
        this.db = firebase.firestore();
        this.db.settings({
            timestampsInSnapshots: true
        });
    }

    getUpcomingEvent() {
        return this.getEvents()
            .then(function (events) {
                let event = events[0];
                if (!event) {
                    event = CalendarEvent.getPlaceHolder();
                }
                return event;
            });
    }

    getEvents() {
        let collection = this.db.collection("events");
        return new Promise(function (resolve, reject) {
            collection.orderBy("date").get()
                .then(function (querySnapshot) {
                    let events = [];
                    let today = new Date();
                    querySnapshot.forEach(function (doc) {
                        let data = doc.data();
                        let eventDate = new Date(data.date.value);
                        if (!CalendarEvent.isValidDate(eventDate) || eventDate >= today) {
                            let event = new CalendarEvent()
                                .withTitle(data.title.value)
                                .withSubtitle(data.subtitle.value)
                                .withDescription(data.description.value)
                                .withTicketPurchaseUrl(data.ticketPurchaseUrl.value)
                                .withTime(data.time.value)
                                .withDate(data.date.value)
                                .withLocation(data.location.value)
                                .withAddress(data.address.value)
                                .withWebsite(data.website.value)
                                .withPrice(data.price.value)
                                .build();
                            events.push(event)
                        }
                    });
                    if (events.length === 0) {
                        events.push(CalendarEvent.getPlaceHolder());
                    }
                    resolve(events)
                })
                .catch(function () {
                    reject();
                });
        });
    }
}