class CalendarEvent {
    constructor() { }

    withTitle(title) {
        this.title = title;
        return this;
    }

    withSubtitle(subtitle) {
        this.subtitle = subtitle;
        return this;
    }

    withDescription(description) {
        this.description = description;
        return this;
    }

    withTicketPurchaseUrl(ticketPurchaseUrl) {
        this.ticketPurchaseUrl = ticketPurchaseUrl;
        return this;
    }

    withTime(time) {
        this.time = CalendarEvent.tConvert(time);
        return this;
    }

    withDate(date) {
        this.date = CalendarEvent.dConvert(date);
        return this;
    }

    withLocation(location) {
        this.location = location;
        return this;
    }

    withAddress(address) {
        this.address = address;
        return this;
    }

    withWebsite(website) {
        this.website = website;
        return this;
    }
    withPrice(price) {
        this.price = price;
        return this;
    }

    build() {
        return {
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            ticketPurchaseUrl: this.ticketPurchaseUrl,
            time: this.time,
            date: this.date,
            location: this.location,
            address: this.address,
            website: this.website,
            price: this.price
        }
    }

    static generateEventBlock(event, simplified) {
        let eventBlock = `
            <div class="card">
            <h4 class="card-header">$TITLE</h4>
            <div class="card-body">
        `;

        if (!this.emptyProperty(event.subtitle)) {
            eventBlock += `<h5 class="card-title">$SUBTITLE</h5>`;
        }

        eventBlock += `<div class="row">`;

        if (!simplified) {
            if (!this.emptyProperty(event.time)
                || !this.emptyProperty(event.date)
                || !this.emptyProperty(event.location)
                || !this.emptyProperty(event.address)
                || !this.emptyProperty(event.website)) {
                eventBlock += `<div class="col-md-7">`;
            } else {
                eventBlock += `<div class="col-md">`;
            }

            if (!this.emptyProperty(event.description)) {
                eventBlock += `
                    <p class="card-text">
                    $DESCRIPTION
                    </p>
                `;
            }

            eventBlock += `
                </div>
            `;
        }

        if (!this.emptyProperty(event.time)
            || !this.emptyProperty(event.date)
            || !this.emptyProperty(event.location)
            || !this.emptyProperty(event.address)
            || !this.emptyProperty(event.website)) {

            if (!simplified) {
                eventBlock += `<div class="col-md-5">`;
            } else {
                eventBlock += `<div class="col-md">`;
            }
            eventBlock += `
                <ul class="calendar-list">
            `;

            if (!this.emptyProperty(event.time)) {
                eventBlock += `<li><i class="fa fa-clock"></i>$TIME</li>`;
            }

            if (!this.emptyProperty(event.date)) {
                eventBlock += `<li><i class="fa fa-calendar"></i>$DATE</li>`;
            }

            if (!this.emptyProperty(event.location)) {
                eventBlock += `<li><i class="fa fa-building"></i>$LOCATION</li>`;
            }

            if (!this.emptyProperty(event.address)) {
                eventBlock += `<li><i class="fa fa-compass"></i>$ADDRESS</li>`;
            }

            if (!this.emptyProperty(event.website)) {
                eventBlock += `
                    <li>
                    <i class="fa fa-globe"></i><a href="$WEBSITE" class="external-link">$WEBSITE</a>
                    </li>
                `;
            }

            eventBlock += `
                </ul>
                </div>
            `;
        }

        eventBlock += `
            </div>
            </div>
            <div class="card-footer text-muted">
        `;

        if (!simplified) {
            if (!this.emptyProperty(event.ticketPurchaseUrl)) {
                eventBlock += `<a href="$TICKETPURCHASEURL" class="btn btn-info external-link">`;
            } else {
                eventBlock += `<a href="javascript:void(0);" class="btn btn-secondary external-link disabled">`;
            }

            if (!this.emptyProperty(event.price)) {
                if (event.price.toLowerCase().includes("free")
                    || event.price.replace("$", "") == "0"
                    || event.price.replace("$", "") == "0.00") {
                    eventBlock += `Get Tickets - Free</a>`;
                } else {
                    eventBlock += `Buy Tickets - $PRICE</a>`;
                }
            } else {
                eventBlock += `Buy Tickets</a>`;
            }
        } else {
            eventBlock += `<a href="calendar.html" class="btn btn-info">View All Events</a>`;
        }

        eventBlock += `
            </div>
            </div>
        `;

        eventBlock = eventBlock.replace("$TITLE", event.title);
        eventBlock = eventBlock.replace("$SUBTITLE", event.subtitle);
        eventBlock = eventBlock.replace("$DESCRIPTION", event.description);
        eventBlock = eventBlock.replace("$TICKETPURCHASEURL", event.ticketPurchaseUrl);
        eventBlock = eventBlock.replace("$TIME", event.time);
        eventBlock = eventBlock.replace("$DATE", event.date);
        eventBlock = eventBlock.replace("$LOCATION", event.location);
        eventBlock = eventBlock.replace("$ADDRESS", event.address);
        eventBlock = eventBlock.replace("$WEBSITE", event.website);
        eventBlock = eventBlock.replace("$WEBSITE", event.website);
        eventBlock = eventBlock.replace("$PRICE", event.price);

        return eventBlock;
    }

    static emptyProperty(str) {
        return (!str || 0 === str.length);
    }

    static tConvert(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? 'am' : 'pm';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join('');
    }

    static dConvert(date) {
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        };
        let dateObj = new Date(date);
        if (this.isValidDate(dateObj)) {
            let newDate = dateObj.toLocaleDateString("en-US", options);
            return newDate;
        }
    }

    static isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    static getPlaceHolder() {
        return new CalendarEvent()
            .withTitle("Upcoming Events")
            .withSubtitle("Stay tuned for our next concert!")
            .build();
    }
}
