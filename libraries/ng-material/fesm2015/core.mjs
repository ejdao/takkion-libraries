import * as i0 from '@angular/core';
import {
  Version,
  InjectionToken,
  NgModule,
  Optional,
  Inject,
  inject,
  LOCALE_ID,
  Injectable,
  Directive,
  Input,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { BidiModule } from '@takkion/ng-cdk/bidi';
import { VERSION as VERSION$1 } from '@takkion/ng-cdk';
import * as i3 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1$1 from '@takkion/ng-cdk/platform';
import { _isTestEnvironment, normalizePassiveListenerOptions } from '@takkion/ng-cdk/platform';
import * as i1 from '@takkion/ng-cdk/a11y';
import {
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
} from '@takkion/ng-cdk/a11y';
import {
  coerceBooleanProperty,
  coerceNumberProperty,
  coerceElement,
} from '@takkion/ng-cdk/coercion';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { ENTER, SPACE, hasModifierKey } from '@takkion/ng-cdk/keycodes';

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Current version of Angular Material. */
const VERSION = new Version('14.2.7');

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
class AnimationCurves {}
AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
/** @docs-private */
class AnimationDurations {}
AnimationDurations.COMPLEX = '375ms';
AnimationDurations.ENTERING = '225ms';
AnimationDurations.EXITING = '195ms';

/** @docs-private */
function TAKERIAL_SANITY_CHECKS_FACTORY() {
  return true;
}
/** Injection token that configures whether the Material sanity checks are enabled. */
const TAKERIAL_SANITY_CHECKS = new InjectionToken('tak-sanity-checks', {
  providedIn: 'root',
  factory: TAKERIAL_SANITY_CHECKS_FACTORY,
});
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., TakTabsModule).
 */
class TakCommonModule {
  constructor(highContrastModeDetector, _sanityChecks, _document) {
    this._sanityChecks = _sanityChecks;
    this._document = _document;
    /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
    this._hasDoneGlobalChecks = false;
    // While A11yModule also does this, we repeat it here to avoid importing A11yModule
    // in TakCommonModule.
    highContrastModeDetector._applyBodyHighContrastModeCssClasses();
    if (!this._hasDoneGlobalChecks) {
      this._hasDoneGlobalChecks = true;
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (this._checkIsEnabled('doctype')) {
          _checkDoctypeIsDefined(this._document);
        }
        if (this._checkIsEnabled('theme')) {
          _checkThemeIsPresent(this._document);
        }
        if (this._checkIsEnabled('version')) {
          _checkCdkVersionTakch();
        }
      }
    }
  }
  /** Gets whether a specific sanity check is enabled. */
  _checkIsEnabled(name) {
    if (_isTestEnvironment()) {
      return false;
    }
    if (typeof this._sanityChecks === 'boolean') {
      return this._sanityChecks;
    }
    return !!this._sanityChecks[name];
  }
}
TakCommonModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCommonModule,
  deps: [
    { token: i1.HighContrastModeDetector },
    { token: TAKERIAL_SANITY_CHECKS, optional: true },
    { token: DOCUMENT },
  ],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCommonModule,
  imports: [BidiModule],
  exports: [BidiModule],
});
TakCommonModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCommonModule,
  imports: [BidiModule, BidiModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakCommonModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [BidiModule],
          exports: [BidiModule],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.HighContrastModeDetector },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAKERIAL_SANITY_CHECKS],
          },
        ],
      },
      {
        type: Document,
        decorators: [
          {
            type: Inject,
            args: [DOCUMENT],
          },
        ],
      },
    ];
  },
});
/** Checks that the page has a doctype. */
function _checkDoctypeIsDefined(doc) {
  if (!doc.doctype) {
    console.warn(
      'Current document does not have a doctype. This may cause ' +
        'some Angular Material components not to behave as expected.'
    );
  }
}
/** Checks that a theme has been included. */
function _checkThemeIsPresent(doc) {
  // We need to assert that the `body` is defined, because these checks run very early
  // and the `body` won't be defined if the consumer put their scripts in the `head`.
  if (!doc.body || typeof getComputedStyle !== 'function') {
    return;
  }
  const testElement = doc.createElement('div');
  testElement.classList.add('tak-theme-loaded-marker');
  doc.body.appendChild(testElement);
  const computedStyle = getComputedStyle(testElement);
  // In some situations the computed style of the test element can be null. For example in
  // Firefox, the computed style is null if an application is running inside of a hidden iframe.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  if (computedStyle && computedStyle.display !== 'none') {
    console.warn(
      'Could not find Angular Material core theme. Most Material ' +
        'components may not work as expected. For more info refer ' +
        'to the theming guide: https://material.angular.io/guide/theming'
    );
  }
  testElement.remove();
}
/** Checks whether the Material version matches the CDK version. */
function _checkCdkVersionTakch() {
  if (VERSION.full !== VERSION$1.full) {
    console.warn(
      'The Angular Material version (' +
        VERSION.full +
        ') does not match ' +
        'the Angular CDK version (' +
        VERSION$1.full +
        ').\n' +
        'Please ensure the versions of these two packages exactly match.'
    );
  }
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function mixinDisabled(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this._disabled = false;
    }
    get disabled() {
      return this._disabled;
    }
    set disabled(value) {
      this._disabled = coerceBooleanProperty(value);
    }
  };
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function mixinColor(base, defaultColor) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this.defaultColor = defaultColor;
      // Set the default color that can be specified from the mixin.
      this.color = defaultColor;
    }
    get color() {
      return this._color;
    }
    set color(value) {
      const colorPalette = value || this.defaultColor;
      if (colorPalette !== this._color) {
        if (this._color) {
          this._elementRef.nativeElement.classList.remove(`tak-${this._color}`);
        }
        if (colorPalette) {
          this._elementRef.nativeElement.classList.add(`tak-${colorPalette}`);
        }
        this._color = colorPalette;
      }
    }
  };
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function mixinDisableRipple(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this._disableRipple = false;
    }
    /** Whether the ripple effect is disabled or not. */
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(value) {
      this._disableRipple = coerceBooleanProperty(value);
    }
  };
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function mixinTabIndex(base, defaultTabIndex = 0) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this._tabIndex = defaultTabIndex;
      this.defaultTabIndex = defaultTabIndex;
    }
    get tabIndex() {
      return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(value) {
      // If the specified tabIndex value is null or undefined, fall back to the default value.
      this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
    }
  };
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function mixinErrorState(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      /** Whether the component is in an error state. */
      this.errorState = false;
    }
    /** Updates the error state based on the provided error state matcher. */
    updateErrorState() {
      const oldState = this.errorState;
      const parent = this._parentFormGroup || this._parentForm;
      const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
      const control = this.ngControl ? this.ngControl.control : null;
      const newState = matcher.isErrorState(control, parent);
      if (newState !== oldState) {
        this.errorState = newState;
        this.stateChanges.next();
      }
    }
  };
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Mixin to augment a directive with an initialized property that will emits when ngOnInit ends. */
function mixinInitialized(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      /** Whether this directive has been marked as initialized. */
      this._isInitialized = false;
      /**
       * List of subscribers that subscribed before the directive was initialized. Should be notified
       * during _markInitialized. Set to null after pending subscribers are notified, and should
       * not expect to be populated after.
       */
      this._pendingSubscribers = [];
      /**
       * Observable stream that emits when the directive initializes. If already initialized, the
       * subscriber is stored to be notified once _markInitialized is called.
       */
      this.initialized = new Observable(subscriber => {
        // If initialized, immediately notify the subscriber. Otherwise store the subscriber to notify
        // when _markInitialized is called.
        if (this._isInitialized) {
          this._notifySubscriber(subscriber);
        } else {
          this._pendingSubscribers.push(subscriber);
        }
      });
    }
    /**
     * Marks the state as initialized and notifies pending subscribers. Should be called at the end
     * of ngOnInit.
     * @docs-private
     */
    _markInitialized() {
      if (this._isInitialized && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error(
          'This directive has already been marked as initialized and ' +
            'should not be called twice.'
        );
      }
      this._isInitialized = true;
      this._pendingSubscribers.forEach(this._notifySubscriber);
      this._pendingSubscribers = null;
    }
    /** Emits and completes the subscriber stream (should only emit once). */
    _notifySubscriber(subscriber) {
      subscriber.next();
      subscriber.complete();
    }
  };
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** InjectionToken for datepicker that can be used to override default locale code. */
const TAK_DATE_LOCALE = new InjectionToken('TAK_DATE_LOCALE', {
  providedIn: 'root',
  factory: TAK_DATE_LOCALE_FACTORY,
});
/** @docs-private */
function TAK_DATE_LOCALE_FACTORY() {
  return inject(LOCALE_ID);
}
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
class DateAdapter {
  constructor() {
    this._localeChanges = new Subject();
    /** A stream that emits when the locale changes. */
    this.localeChanges = this._localeChanges;
  }
  /**
   * Given a potential date object, returns that same date object if it is
   * a valid date, or `null` if it's not a valid date.
   * @param obj The object to check.
   * @returns A date or `null`.
   */
  getValidDateOrNull(obj) {
    return this.isDateInstance(obj) && this.isValid(obj) ? obj : null;
  }
  /**
   * Attempts to deserialize a value to a valid date object. This is different from parsing in that
   * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
   * string). The default implementation does not allow any deserialization, it simply checks that
   * the given value is already a valid date object or null. The `<tak-datepicker>` will call this
   * method on all of its `@Input()` properties that accept dates. It is therefore possible to
   * support passing values from your backend directly to these properties by overriding this method
   * to also deserialize the format used by your backend.
   * @param value The value to be deserialized into a date object.
   * @returns The deserialized date object, either a valid date, null if the value can be
   *     deserialized into a null date (e.g. the empty string), or an invalid date.
   */
  deserialize(value) {
    if (value == null || (this.isDateInstance(value) && this.isValid(value))) {
      return value;
    }
    return this.invalid();
  }
  /**
   * Sets the locale used for all dates.
   * @param locale The new locale.
   */
  setLocale(locale) {
    this.locale = locale;
    this._localeChanges.next();
  }
  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  compareDate(first, second) {
    return (
      this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second)
    );
  }
  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  sameDate(first, second) {
    if (first && second) {
      let firstValid = this.isValid(first);
      let secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !this.compareDate(first, second);
      }
      return firstValid == secondValid;
    }
    return first == second;
  }
  /**
   * Clamp the given date between min and max dates.
   * @param date The date to clamp.
   * @param min The minimum value to allow. If null or omitted no min is enforced.
   * @param max The maximum value to allow. If null or omitted no max is enforced.
   * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
   *     otherwise `date`.
   */
  clampDate(date, min, max) {
    if (min && this.compareDate(date, min) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max) > 0) {
      return max;
    }
    return date;
  }
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const TAK_DATE_FORTAKS = new InjectionToken('tak-date-formats');

/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
const ISO_8601_REGEX =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
class NativeDateAdapter extends DateAdapter {
  constructor(
    takDateLocale,
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 14.0.0
     */
    _platform
  ) {
    super();
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 14.0.0
     */
    this.useUtcForDisplay = false;
    super.setLocale(takDateLocale);
  }
  getYear(date) {
    return date.getFullYear();
  }
  getMonth(date) {
    return date.getMonth();
  }
  getDate(date) {
    return date.getDate();
  }
  getDayOfWeek(date) {
    return date.getDay();
  }
  getMonthNames(style) {
    const dtf = new Intl.DateTimeFortak(this.locale, { month: style, timeZone: 'utc' });
    return range(12, i => this._format(dtf, new Date(2017, i, 1)));
  }
  getDateNames() {
    const dtf = new Intl.DateTimeFortak(this.locale, { day: 'numeric', timeZone: 'utc' });
    return range(31, i => this._format(dtf, new Date(2017, 0, i + 1)));
  }
  getDayOfWeekNames(style) {
    const dtf = new Intl.DateTimeFortak(this.locale, { weekday: style, timeZone: 'utc' });
    return range(7, i => this._format(dtf, new Date(2017, 0, i + 1)));
  }
  getYearName(date) {
    const dtf = new Intl.DateTimeFortak(this.locale, { year: 'numeric', timeZone: 'utc' });
    return this._format(dtf, date);
  }
  getFirstDayOfWeek() {
    // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
    return 0;
  }
  getNumDaysInMonth(date) {
    return this.getDate(
      this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0)
    );
  }
  clone(date) {
    return new Date(date.getTime());
  }
  createDate(year, month, date) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      // Check for invalid month and date (except upper bound on date which we have to check after
      // creating the Date).
      if (month < 0 || month > 11) {
        throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
      }
      if (date < 1) {
        throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
      }
    }
    let result = this._createDateWithOverflow(year, month, date);
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() != month && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
  today() {
    return new Date();
  }
  parse(value, parseFortak) {
    // We have no way using the native JS Date to set the parse format or locale, so we ignore these
    // parameters.
    if (typeof value == 'number') {
      return new Date(value);
    }
    return value ? new Date(Date.parse(value)) : null;
  }
  format(date, displayFortak) {
    if (!this.isValid(date)) {
      throw Error('NativeDateAdapter: Cannot format invalid date.');
    }
    const dtf = new Intl.DateTimeFortak(
      this.locale,
      Object.assign(Object.assign({}, displayFortak), { timeZone: 'utc' })
    );
    return this._format(dtf, date);
  }
  addCalendarYears(date, years) {
    return this.addCalendarMonths(date, years * 12);
  }
  addCalendarMonths(date, months) {
    let newDate = this._createDateWithOverflow(
      this.getYear(date),
      this.getMonth(date) + months,
      this.getDate(date)
    );
    // It's possible to wind up in the wrong month if the original month has more days than the new
    // month. In this case we want to go to the last day of the desired month.
    // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
    // guarantee this.
    if (this.getMonth(newDate) != (((this.getMonth(date) + months) % 12) + 12) % 12) {
      newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
    }
    return newDate;
  }
  addCalendarDays(date, days) {
    return this._createDateWithOverflow(
      this.getYear(date),
      this.getMonth(date),
      this.getDate(date) + days
    );
  }
  toIso8601(date) {
    return [
      date.getUTCFullYear(),
      this._2digit(date.getUTCMonth() + 1),
      this._2digit(date.getUTCDate()),
    ].join('-');
  }
  /**
   * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
   * invalid date for all other values.
   */
  deserialize(value) {
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
      // string is the right format first.
      if (ISO_8601_REGEX.test(value)) {
        let date = new Date(value);
        if (this.isValid(date)) {
          return date;
        }
      }
    }
    return super.deserialize(value);
  }
  isDateInstance(obj) {
    return obj instanceof Date;
  }
  isValid(date) {
    return !isNaN(date.getTime());
  }
  invalid() {
    return new Date(NaN);
  }
  /** Creates a date but allows the month and date to overflow. */
  _createDateWithOverflow(year, month, date) {
    // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
    // To work around this we use `setFullYear` and `setHours` instead.
    const d = new Date();
    d.setFullYear(year, month, date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  /**
   * Pads a number to make it two digits.
   * @param n The number to pad.
   * @returns The padded number.
   */
  _2digit(n) {
    return ('00' + n).slice(-2);
  }
  /**
   * When converting Date object to string, javascript built-in functions may return wrong
   * results because it applies its internal DST rules. The DST rules around the world change
   * very frequently, and the current valid rule is not always valid in previous years though.
   * We work around this problem building a new Date object which has its internal UTC
   * representation with the local date and time.
   * @param dtf Intl.DateTimeFortak object, containing the desired string format. It must have
   *    timeZone set to 'utc' to work fine.
   * @param date Date from which we want to get the string representation according to dtf
   * @returns A Date object with its UTC representation based on the passed in date info
   */
  _format(dtf, date) {
    // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
    // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
    const d = new Date();
    d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return dtf.format(d);
  }
}
NativeDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateAdapter,
  deps: [{ token: TAK_DATE_LOCALE, optional: true }, { token: i1$1.Platform }],
  target: i0.ɵɵFactoryTarget.Injectable,
});
NativeDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateAdapter,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateAdapter,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_DATE_LOCALE],
          },
        ],
      },
      { type: i1$1.Platform },
    ];
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const TAK_NATIVE_DATE_FORTAKS = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class NativeDateModule {}
NativeDateModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
NativeDateModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateModule,
});
NativeDateModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateModule,
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: NativeDateModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
        },
      ],
    },
  ],
});
class TakNativeDateModule {}
TakNativeDateModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNativeDateModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakNativeDateModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNativeDateModule,
  imports: [NativeDateModule],
});
TakNativeDateModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNativeDateModule,
  providers: [{ provide: TAK_DATE_FORTAKS, useValue: TAK_NATIVE_DATE_FORTAKS }],
  imports: [NativeDateModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakNativeDateModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [NativeDateModule],
          providers: [{ provide: TAK_DATE_FORTAKS, useValue: TAK_NATIVE_DATE_FORTAKS }],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Error state matcher that matches when a control is invalid and dirty. */
class ShowOnDirtyErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
  }
}
ShowOnDirtyErrorStateMatcher.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: ShowOnDirtyErrorStateMatcher,
  deps: [],
  target: i0.ɵɵFactoryTarget.Injectable,
});
ShowOnDirtyErrorStateMatcher.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: ShowOnDirtyErrorStateMatcher,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: ShowOnDirtyErrorStateMatcher,
  decorators: [
    {
      type: Injectable,
    },
  ],
});
/** Provider that defines how form controls behave with regards to displaying error messages. */
class ErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}
ErrorStateMatcher.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: ErrorStateMatcher,
  deps: [],
  target: i0.ɵɵFactoryTarget.Injectable,
});
ErrorStateMatcher.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: ErrorStateMatcher,
  providedIn: 'root',
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: ErrorStateMatcher,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(TakLine) query, then
 * counted by checking the query list's length.
 */
class TakLine {}
TakLine.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakLine,
  deps: [],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakLine.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakLine,
  selector: '[tak-line], [takLine]',
  host: { classAttribute: 'tak-line' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakLine,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-line], [takLine]',
          host: { class: 'tak-line' },
        },
      ],
    },
  ],
});
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
function setLines(lines, element, prefix = 'tak') {
  // Note: doesn't need to unsubscribe, because `changes`
  // gets completed by Angular when the view is destroyed.
  lines.changes.pipe(startWith(lines)).subscribe(({ length }) => {
    setClass(element, `${prefix}-2-line`, false);
    setClass(element, `${prefix}-3-line`, false);
    setClass(element, `${prefix}-multi-line`, false);
    if (length === 2 || length === 3) {
      setClass(element, `${prefix}-${length}-line`, true);
    } else if (length > 3) {
      setClass(element, `${prefix}-multi-line`, true);
    }
  });
}
/** Adds or removes a class from an element. */
function setClass(element, className, isAdd) {
  element.nativeElement.classList.toggle(className, isAdd);
}
class TakLineModule {}
TakLineModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakLineModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakLineModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakLineModule,
  declarations: [TakLine],
  imports: [TakCommonModule],
  exports: [TakLine, TakCommonModule],
});
TakLineModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakLineModule,
  imports: [TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakLineModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule],
          exports: [TakLine, TakCommonModule],
          declarations: [TakLine],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Reference to a previously launched ripple element.
 */
class RippleRef {
  constructor(
    _renderer,
    /** Reference to the ripple HTML element. */
    element,
    /** Ripple configuration used for the ripple. */
    config,
    /* Whether animations are forcibly disabled for ripples through CSS. */
    _animationForciblyDisabledThroughCss = false
  ) {
    this._renderer = _renderer;
    this.element = element;
    this.config = config;
    this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
    /** Current state of the ripple. */
    this.state = 3 /* RippleState.HIDDEN */;
  }
  /** Fades out the ripple element. */
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
}

// TODO: import these values from `@material/ripple` eventually.
/**
 * Default ripple animation configuration for ripples without an explicit
 * animation config specified.
 */
const defaultRippleAnimationConfig = {
  enterDuration: 225,
  exitDuration: 150,
};
/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
const ignoreMouseEventsTimeout = 800;
/** Options that apply to all the event listeners that are bound by the ripple renderer. */
const passiveEventOptions = normalizePassiveListenerOptions({ passive: true });
/** Events that signal that the pointer is down. */
const pointerDownEvents = ['mousedown', 'touchstart'];
/** Events that signal that the pointer is up. */
const pointerUpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
class RippleRenderer {
  constructor(_target, _ngZone, elementOrElementRef, platform) {
    this._target = _target;
    this._ngZone = _ngZone;
    /** Whether the pointer is currently down or not. */
    this._isPointerDown = false;
    /**
     * Map of currently active ripple references.
     * The ripple reference is mapped to its element event listeners.
     * The reason why `| null` is used is that event listeners are added only
     * when the condition is truthy (see the `_startFadeOutTransition` method).
     */
    this._activeRipples = new Map();
    /** Whether pointer-up event listeners have been registered. */
    this._pointerUpEventsRegistered = false;
    // Only do anything if we're on the browser.
    if (platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }
  }
  /**
   * Fades in a ripple at the given coordinates.
   * @param x Coordinate within the element, along the X axis at which to start the ripple.
   * @param y Coordinate within the element, along the Y axis at which to start the ripple.
   * @param config Extra ripple options.
   */
  fadeInRipple(x, y, config = {}) {
    const containerRect = (this._containerRect =
      this._containerRect || this._containerElement.getBoundingClientRect());
    const animationConfig = Object.assign(
      Object.assign({}, defaultRippleAnimationConfig),
      config.animation
    );
    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const enterDuration = animationConfig.enterDuration;
    const ripple = document.createElement('div');
    ripple.classList.add('tak-ripple-element');
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    // If a custom color has been specified, set it as inline style. If no color is
    // set, the default color will be applied through the ripple theme styles.
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }
    ripple.style.transitionDuration = `${enterDuration}ms`;
    this._containerElement.appendChild(ripple);
    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical to ensure that the `scale` animates properly.
    // We enforce a style recalculation by calling `getComputedStyle` and *accessing* a property.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    const computedStyles = window.getComputedStyle(ripple);
    const userTransitionProperty = computedStyles.transitionProperty;
    const userTransitionDuration = computedStyles.transitionDuration;
    // Note: We detect whether animation is forcibly disabled through CSS by the use of
    // `transition: none`. This is technically unexpected since animations are controlled
    // through the animation config, but this exists for backwards compatibility. This logic does
    // not need to be super accurate since it covers some edge cases which can be easily avoided by users.
    const animationForciblyDisabledThroughCss =
      userTransitionProperty === 'none' ||
      // Note: The canonical unit for serialized CSS `<time>` properties is seconds. Additionally
      // some browsers expand the duration for every property (in our case `opacity` and `transform`).
      userTransitionDuration === '0s' ||
      userTransitionDuration === '0s, 0s';
    // Exposed reference to the ripple that will be returned.
    const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
    // Start the enter animation by setting the transform/scale to 100%. The animation will
    // execute as part of this statement because we forced a style recalculation before.
    // Note: We use a 3d transform here in order to avoid an issue in Safari where
    // the ripples aren't clipped when inside the shadow DOM (see #24028).
    ripple.style.transform = 'scale3d(1, 1, 1)';
    rippleRef.state = 0 /* RippleState.FADING_IN */;
    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }
    let eventListeners = null;
    // Do not register the `transition` event listener if fade-in and fade-out duration
    // are set to zero. The events won't fire anyway and we can save resources here.
    if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
      this._ngZone.runOutsideAngular(() => {
        const onTransitionEnd = () => this._finishRippleTransition(rippleRef);
        const onTransitionCancel = () => this._destroyRipple(rippleRef);
        ripple.addEventListener('transitionend', onTransitionEnd);
        // If the transition is cancelled (e.g. due to DOM removal), we destroy the ripple
        // directly as otherwise we would keep it part of the ripple container forever.
        // https://www.w3.org/TR/css-transitions-1/#:~:text=no%20longer%20in%20the%20document.
        ripple.addEventListener('transitioncancel', onTransitionCancel);
        eventListeners = { onTransitionEnd, onTransitionCancel };
      });
    }
    // Add the ripple reference to the list of all active ripples.
    this._activeRipples.set(rippleRef, eventListeners);
    // In case there is no fade-in transition duration, we need to manually call the transition
    // end listener because `transitionend` doesn't fire if there is no transition.
    if (animationForciblyDisabledThroughCss || !enterDuration) {
      this._finishRippleTransition(rippleRef);
    }
    return rippleRef;
  }
  /** Fades out a ripple reference. */
  fadeOutRipple(rippleRef) {
    // For ripples already fading out or hidden, this should be a noop.
    if (
      rippleRef.state === 2 /* RippleState.FADING_OUT */ ||
      rippleRef.state === 3 /* RippleState.HIDDEN */
    ) {
      return;
    }
    const rippleEl = rippleRef.element;
    const animationConfig = Object.assign(
      Object.assign({}, defaultRippleAnimationConfig),
      rippleRef.config.animation
    );
    // This starts the fade-out transition and will fire the transition end listener that
    // removes the ripple element from the DOM.
    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = '0';
    rippleRef.state = 2 /* RippleState.FADING_OUT */;
    // In case there is no fade-out transition duration, we need to manually call the
    // transition end listener because `transitionend` doesn't fire if there is no transition.
    if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
      this._finishRippleTransition(rippleRef);
    }
  }
  /** Fades out all currently active ripples. */
  fadeOutAll() {
    this._getActiveRipples().forEach(ripple => ripple.fadeOut());
  }
  /** Fades out all currently active non-persistent ripples. */
  fadeOutAllNonPersistent() {
    this._getActiveRipples().forEach(ripple => {
      if (!ripple.config.persistent) {
        ripple.fadeOut();
      }
    });
  }
  /** Sets up the trigger event listeners */
  setupTriggerEvents(elementOrElementRef) {
    const element = coerceElement(elementOrElementRef);
    if (!element || element === this._triggerElement) {
      return;
    }
    // Remove all previously registered event listeners from the trigger element.
    this._removeTriggerEvents();
    this._triggerElement = element;
    this._registerEvents(pointerDownEvents);
  }
  /**
   * Handles all registered events.
   * @docs-private
   */
  handleEvent(event) {
    if (event.type === 'mousedown') {
      this._onMousedown(event);
    } else if (event.type === 'touchstart') {
      this._onTouchStart(event);
    } else {
      this._onPointerUp();
    }
    // If pointer-up events haven't been registered yet, do so now.
    // We do this on-demand in order to reduce the total number of event listeners
    // registered by the ripples, which speeds up the rendering time for large UIs.
    if (!this._pointerUpEventsRegistered) {
      this._registerEvents(pointerUpEvents);
      this._pointerUpEventsRegistered = true;
    }
  }
  /** Method that will be called if the fade-in or fade-in transition completed. */
  _finishRippleTransition(rippleRef) {
    if (rippleRef.state === 0 /* RippleState.FADING_IN */) {
      this._startFadeOutTransition(rippleRef);
    } else if (rippleRef.state === 2 /* RippleState.FADING_OUT */) {
      this._destroyRipple(rippleRef);
    }
  }
  /**
   * Starts the fade-out transition of the given ripple if it's not persistent and the pointer
   * is not held down anymore.
   */
  _startFadeOutTransition(rippleRef) {
    const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
    const { persistent } = rippleRef.config;
    rippleRef.state = 1 /* RippleState.VISIBLE */;
    // When the timer runs out while the user has kept their pointer down, we want to
    // keep only the persistent ripples and the latest transient ripple. We do this,
    // because we don't want stacked transient ripples to appear after their enter
    // animation has finished.
    if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
      rippleRef.fadeOut();
    }
  }
  /** Destroys the given ripple by removing it from the DOM and updating its state. */
  _destroyRipple(rippleRef) {
    var _a;
    const eventListeners =
      (_a = this._activeRipples.get(rippleRef)) !== null && _a !== void 0 ? _a : null;
    this._activeRipples.delete(rippleRef);
    // Clear out the cached bounding rect if we have no more ripples.
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }
    // If the current ref is the most recent transient ripple, unset it
    // avoid memory leaks.
    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }
    rippleRef.state = 3 /* RippleState.HIDDEN */;
    if (eventListeners !== null) {
      rippleRef.element.removeEventListener('transitionend', eventListeners.onTransitionEnd);
      rippleRef.element.removeEventListener('transitioncancel', eventListeners.onTransitionCancel);
    }
    rippleRef.element.remove();
  }
  /** Function being called whenever the trigger is being pressed using mouse. */
  _onMousedown(event) {
    // Screen readers will fire fake mouse events for space/enter. Skip launching a
    // ripple in this case for consistency with the non-screen-reader experience.
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent =
      this._lastTouchStartEvent &&
      Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    }
  }
  /** Function being called whenever the trigger is being pressed using touch. */
  _onTouchStart(event) {
    if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
      // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
      // events will launch a second ripple if we don't ignore mouse events for a specific
      // time after a touchstart event.
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;
      // Use `changedTouches` so we skip any touches where the user put
      // their finger down, but used another finger to tap the element again.
      const touches = event.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
      }
    }
  }
  /** Function being called whenever the trigger is being released. */
  _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }
    this._isPointerDown = false;
    // Fade-out all ripples that are visible and not persistent.
    this._getActiveRipples().forEach(ripple => {
      // By default, only ripples that are completely visible will fade out on pointer release.
      // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
      const isVisible =
        ripple.state === 1 /* RippleState.VISIBLE */ ||
        (ripple.config.terminateOnPointerUp && ripple.state === 0); /* RippleState.FADING_IN */
      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }
  /** Registers event listeners for a given list of events. */
  _registerEvents(eventTypes) {
    this._ngZone.runOutsideAngular(() => {
      eventTypes.forEach(type => {
        this._triggerElement.addEventListener(type, this, passiveEventOptions);
      });
    });
  }
  _getActiveRipples() {
    return Array.from(this._activeRipples.keys());
  }
  /** Removes previously registered event listeners from the trigger element. */
  _removeTriggerEvents() {
    if (this._triggerElement) {
      pointerDownEvents.forEach(type => {
        this._triggerElement.removeEventListener(type, this, passiveEventOptions);
      });
      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach(type => {
          this._triggerElement.removeEventListener(type, this, passiveEventOptions);
        });
      }
    }
  }
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}

/** Injection token that can be used to specify the global ripple options. */
const TAK_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('tak-ripple-global-options');
class TakRipple {
  constructor(_elementRef, ngZone, platform, globalOptions, _animationMode) {
    this._elementRef = _elementRef;
    this._animationMode = _animationMode;
    /**
     * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
     * will be the distance from the center of the ripple to the furthest corner of the host element's
     * bounding rectangle.
     */
    this.radius = 0;
    this._disabled = false;
    /** Whether ripple directive is initialized and the input bindings are set. */
    this._isInitialized = false;
    this._globalOptions = globalOptions || {};
    this._rippleRenderer = new RippleRenderer(this, ngZone, _elementRef, platform);
  }
  /**
   * Whether click events will not trigger the ripple. Ripples can be still launched manually
   * by using the `launch()` method.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    if (value) {
      this.fadeOutAllNonPersistent();
    }
    this._disabled = value;
    this._setupTriggerEventsIfEnabled();
  }
  /**
   * The element that triggers the ripple when click events are received.
   * Defaults to the directive's host element.
   */
  get trigger() {
    return this._trigger || this._elementRef.nativeElement;
  }
  set trigger(trigger) {
    this._trigger = trigger;
    this._setupTriggerEventsIfEnabled();
  }
  ngOnInit() {
    this._isInitialized = true;
    this._setupTriggerEventsIfEnabled();
  }
  ngOnDestroy() {
    this._rippleRenderer._removeTriggerEvents();
  }
  /** Fades out all currently showing ripple elements. */
  fadeOutAll() {
    this._rippleRenderer.fadeOutAll();
  }
  /** Fades out all currently showing non-persistent ripple elements. */
  fadeOutAllNonPersistent() {
    this._rippleRenderer.fadeOutAllNonPersistent();
  }
  /**
   * Ripple configuration from the directive's input values.
   * @docs-private Implemented as part of RippleTarget
   */
  get rippleConfig() {
    return {
      centered: this.centered,
      radius: this.radius,
      color: this.color,
      animation: Object.assign(
        Object.assign(
          Object.assign({}, this._globalOptions.animation),
          this._animationMode === 'NoopAnimations' ? { enterDuration: 0, exitDuration: 0 } : {}
        ),
        this.animation
      ),
      terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
    };
  }
  /**
   * Whether ripples on pointer-down are disabled or not.
   * @docs-private Implemented as part of RippleTarget
   */
  get rippleDisabled() {
    return this.disabled || !!this._globalOptions.disabled;
  }
  /** Sets up the trigger event listeners if ripples are enabled. */
  _setupTriggerEventsIfEnabled() {
    if (!this.disabled && this._isInitialized) {
      this._rippleRenderer.setupTriggerEvents(this.trigger);
    }
  }
  /** Launches a manual ripple at the specified coordinated or just by the ripple config. */
  launch(configOrX, y = 0, config) {
    if (typeof configOrX === 'number') {
      return this._rippleRenderer.fadeInRipple(
        configOrX,
        y,
        Object.assign(Object.assign({}, this.rippleConfig), config)
      );
    } else {
      return this._rippleRenderer.fadeInRipple(
        0,
        0,
        Object.assign(Object.assign({}, this.rippleConfig), configOrX)
      );
    }
  }
}
TakRipple.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRipple,
  deps: [
    { token: i0.ElementRef },
    { token: i0.NgZone },
    { token: i1$1.Platform },
    { token: TAK_RIPPLE_GLOBAL_OPTIONS, optional: true },
    { token: ANIMATION_MODULE_TYPE, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Directive,
});
TakRipple.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakRipple,
  selector: '[tak-ripple], [takRipple]',
  inputs: {
    color: ['takRippleColor', 'color'],
    unbounded: ['takRippleUnbounded', 'unbounded'],
    centered: ['takRippleCentered', 'centered'],
    radius: ['takRippleRadius', 'radius'],
    animation: ['takRippleAnimation', 'animation'],
    disabled: ['takRippleDisabled', 'disabled'],
    trigger: ['takRippleTrigger', 'trigger'],
  },
  host: { properties: { 'class.tak-ripple-unbounded': 'unbounded' }, classAttribute: 'tak-ripple' },
  exportAs: ['takRipple'],
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRipple,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[tak-ripple], [takRipple]',
          exportAs: 'takRipple',
          host: {
            class: 'tak-ripple',
            '[class.tak-ripple-unbounded]': 'unbounded',
          },
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.NgZone },
      { type: i1$1.Platform },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_RIPPLE_GLOBAL_OPTIONS],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
    ];
  },
  propDecorators: {
    color: [
      {
        type: Input,
        args: ['takRippleColor'],
      },
    ],
    unbounded: [
      {
        type: Input,
        args: ['takRippleUnbounded'],
      },
    ],
    centered: [
      {
        type: Input,
        args: ['takRippleCentered'],
      },
    ],
    radius: [
      {
        type: Input,
        args: ['takRippleRadius'],
      },
    ],
    animation: [
      {
        type: Input,
        args: ['takRippleAnimation'],
      },
    ],
    disabled: [
      {
        type: Input,
        args: ['takRippleDisabled'],
      },
    ],
    trigger: [
      {
        type: Input,
        args: ['takRippleTrigger'],
      },
    ],
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakRippleModule {}
TakRippleModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRippleModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakRippleModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRippleModule,
  declarations: [TakRipple],
  imports: [TakCommonModule],
  exports: [TakRipple, TakCommonModule],
});
TakRippleModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRippleModule,
  imports: [TakCommonModule, TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakRippleModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule],
          exports: [TakRipple, TakCommonModule],
          declarations: [TakRipple],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `tak-primary .tak-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<tak-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
class TakPseudoCheckbox {
  constructor(_animationMode) {
    this._animationMode = _animationMode;
    /** Display state of the checkbox. */
    this.state = 'unchecked';
    /** Whether the checkbox is disabled. */
    this.disabled = false;
  }
}
TakPseudoCheckbox.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPseudoCheckbox,
  deps: [{ token: ANIMATION_MODULE_TYPE, optional: true }],
  target: i0.ɵɵFactoryTarget.Component,
});
TakPseudoCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakPseudoCheckbox,
  selector: 'tak-pseudo-checkbox',
  inputs: { state: 'state', disabled: 'disabled' },
  host: {
    properties: {
      'class.tak-pseudo-checkbox-indeterminate': 'state === "indeterminate"',
      'class.tak-pseudo-checkbox-checked': 'state === "checked"',
      'class.tak-pseudo-checkbox-disabled': 'disabled',
      'class._tak-animation-noopable': '_animationMode === "NoopAnimations"',
    },
    classAttribute: 'tak-pseudo-checkbox',
  },
  ngImport: i0,
  template: '',
  isInline: true,
  styles: [
    '.tak-pseudo-checkbox{width:16px;height:16px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),background-color 90ms cubic-bezier(0, 0, 0.2, 0.1)}.tak-pseudo-checkbox::after{position:absolute;opacity:0;content:"";border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}.tak-pseudo-checkbox.tak-pseudo-checkbox-checked,.tak-pseudo-checkbox.tak-pseudo-checkbox-indeterminate{border-color:rgba(0,0,0,0)}.tak-pseudo-checkbox._tak-animation-noopable{transition:none !important;animation:none !important}.tak-pseudo-checkbox._tak-animation-noopable::after{transition:none}.tak-pseudo-checkbox-disabled{cursor:default}.tak-pseudo-checkbox-indeterminate::after{top:5px;left:1px;width:10px;opacity:1;border-radius:2px}.tak-pseudo-checkbox-checked::after{top:2.4px;left:1px;width:8px;height:3px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPseudoCheckbox,
  decorators: [
    {
      type: Component,
      args: [
        {
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          selector: 'tak-pseudo-checkbox',
          template: '',
          host: {
            class: 'tak-pseudo-checkbox',
            '[class.tak-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
            '[class.tak-pseudo-checkbox-checked]': 'state === "checked"',
            '[class.tak-pseudo-checkbox-disabled]': 'disabled',
            '[class._tak-animation-noopable]': '_animationMode === "NoopAnimations"',
          },
          styles: [
            '.tak-pseudo-checkbox{width:16px;height:16px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),background-color 90ms cubic-bezier(0, 0, 0.2, 0.1)}.tak-pseudo-checkbox::after{position:absolute;opacity:0;content:"";border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}.tak-pseudo-checkbox.tak-pseudo-checkbox-checked,.tak-pseudo-checkbox.tak-pseudo-checkbox-indeterminate{border-color:rgba(0,0,0,0)}.tak-pseudo-checkbox._tak-animation-noopable{transition:none !important;animation:none !important}.tak-pseudo-checkbox._tak-animation-noopable::after{transition:none}.tak-pseudo-checkbox-disabled{cursor:default}.tak-pseudo-checkbox-indeterminate::after{top:5px;left:1px;width:10px;opacity:1;border-radius:2px}.tak-pseudo-checkbox-checked::after{top:2.4px;left:1px;width:8px;height:3px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [ANIMATION_MODULE_TYPE],
          },
        ],
      },
    ];
  },
  propDecorators: {
    state: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
  },
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakPseudoCheckboxModule {}
TakPseudoCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPseudoCheckboxModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakPseudoCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPseudoCheckboxModule,
  declarations: [TakPseudoCheckbox],
  imports: [TakCommonModule],
  exports: [TakPseudoCheckbox],
});
TakPseudoCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPseudoCheckboxModule,
  imports: [TakCommonModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakPseudoCheckboxModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakCommonModule],
          exports: [TakPseudoCheckbox],
          declarations: [TakPseudoCheckbox],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token used to provide the parent component to options.
 */
const TAK_OPTION_PARENT_COMPONENT = new InjectionToken('TAK_OPTION_PARENT_COMPONENT');

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Notes on the accessibility pattern used for `tak-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `tak-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<tak-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<tak-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Boilerplate for applying mixins to TakOptgroup.
/** @docs-private */
const _TakOptgroupMixinBase = mixinDisabled(class {});
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
class _TakOptgroupBase extends _TakOptgroupMixinBase {
  constructor(parent) {
    var _a;
    super();
    /** Unique id for the underlying label. */
    this._labelId = `tak-optgroup-label-${_uniqueOptgroupIdCounter++}`;
    this._inert =
      (_a = parent === null || parent === void 0 ? void 0 : parent.inertGroups) !== null &&
      _a !== void 0
        ? _a
        : false;
  }
}
_TakOptgroupBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakOptgroupBase,
  deps: [{ token: TAK_OPTION_PARENT_COMPONENT, optional: true }],
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakOptgroupBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakOptgroupBase,
  inputs: { label: 'label' },
  usesInheritance: true,
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakOptgroupBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [TAK_OPTION_PARENT_COMPONENT],
          },
          {
            type: Optional,
          },
        ],
      },
    ];
  },
  propDecorators: {
    label: [
      {
        type: Input,
      },
    ],
  },
});
/**
 * Injection token that can be used to reference instances of `TakOptgroup`. It serves as
 * alternative token to the actual `TakOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const TAK_OPTGROUP = new InjectionToken('TakOptgroup');
/**
 * Component that is used to group instances of `tak-option`.
 */
class TakOptgroup extends _TakOptgroupBase {}
TakOptgroup.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOptgroup,
  deps: null,
  target: i0.ɵɵFactoryTarget.Component,
});
TakOptgroup.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakOptgroup,
  selector: 'tak-optgroup',
  inputs: { disabled: 'disabled' },
  host: {
    properties: {
      'attr.role': '_inert ? null : "group"',
      'attr.aria-disabled': '_inert ? null : disabled.toString()',
      'attr.aria-labelledby': '_inert ? null : _labelId',
      'class.tak-optgroup-disabled': 'disabled',
    },
    classAttribute: 'tak-optgroup',
  },
  providers: [{ provide: TAK_OPTGROUP, useExisting: TakOptgroup }],
  exportAs: ['takOptgroup'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<span class="tak-optgroup-label" aria-hidden="true" [id]="_labelId">{{ label }} <ng-content></ng-content></span>\n<ng-content select="tak-option, ng-container"></ng-content>\n',
  styles: [
    '.tak-optgroup-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;-webkit-user-select:none;user-select:none;cursor:default}.tak-optgroup-label[disabled]{cursor:default}[dir=rtl] .tak-optgroup-label{text-align:right}.tak-optgroup-label .tak-icon{margin-right:16px;vertical-align:middle}.tak-optgroup-label .tak-icon svg{vertical-align:top}[dir=rtl] .tak-optgroup-label .tak-icon{margin-left:16px;margin-right:0}',
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOptgroup,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-optgroup',
          exportAs: 'takOptgroup',
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          inputs: ['disabled'],
          host: {
            class: 'tak-optgroup',
            '[attr.role]': '_inert ? null : "group"',
            '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
            '[attr.aria-labelledby]': '_inert ? null : _labelId',
            '[class.tak-optgroup-disabled]': 'disabled',
          },
          providers: [{ provide: TAK_OPTGROUP, useExisting: TakOptgroup }],
          template:
            '<span class="tak-optgroup-label" aria-hidden="true" [id]="_labelId">{{ label }} <ng-content></ng-content></span>\n<ng-content select="tak-option, ng-container"></ng-content>\n',
          styles: [
            '.tak-optgroup-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;-webkit-user-select:none;user-select:none;cursor:default}.tak-optgroup-label[disabled]{cursor:default}[dir=rtl] .tak-optgroup-label{text-align:right}.tak-optgroup-label .tak-icon{margin-right:16px;vertical-align:middle}.tak-optgroup-label .tak-icon svg{vertical-align:top}[dir=rtl] .tak-optgroup-label .tak-icon{margin-left:16px;margin-right:0}',
          ],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/** Event object emitted by TakOption when selected or deselected. */
class TakOptionSelectionChange {
  constructor(
    /** Reference to the option that emitted the event. */
    source,
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput = false
  ) {
    this.source = source;
    this.isUserInput = isUserInput;
  }
}
class _TakOptionBase {
  constructor(_element, _changeDetectorRef, _parent, group) {
    this._element = _element;
    this._changeDetectorRef = _changeDetectorRef;
    this._parent = _parent;
    this.group = group;
    this._selected = false;
    this._active = false;
    this._disabled = false;
    this._mostRecentViewValue = '';
    /** The unique ID of the option. */
    this.id = `tak-option-${_uniqueIdCounter++}`;
    /** Event emitted when the option is selected or deselected. */
    // tslint:disable-next-line:no-output-on-prefix
    this.onSelectionChange = new EventEmitter();
    /** Emits when the state of the option changes and any parents have to be notified. */
    this._stateChanges = new Subject();
  }
  /** Whether the wrapping component is in multiple selection mode. */
  get multiple() {
    return this._parent && this._parent.multiple;
  }
  /** Whether or not the option is currently selected. */
  get selected() {
    return this._selected;
  }
  /** Whether the option is disabled. */
  get disabled() {
    return (this.group && this.group.disabled) || this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  /** Whether ripples for the option are disabled. */
  get disableRipple() {
    return !!(this._parent && this._parent.disableRipple);
  }
  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  get active() {
    return this._active;
  }
  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  get viewValue() {
    // TODO(kara): Add input property alternative for node envs.
    return (this._getHostElement().textContent || '').trim();
  }
  /** Selects the option. */
  select() {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }
  /** Deselects the option. */
  deselect() {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }
  /** Sets focus onto this option. */
  focus(_origin, options) {
    // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
    // use `TakOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
    const element = this._getHostElement();
    if (typeof element.focus === 'function') {
      element.focus(options);
    }
  }
  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles() {
    if (!this._active) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles() {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }
  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel() {
    return this.viewValue;
  }
  /** Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event) {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
      this._selectViaInteraction();
      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }
  /**
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  _selectViaInteraction() {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }
  /**
   * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
   * attribute from single-selection, unselected options. Including the `aria-selected="false"`
   * attributes adds a significant amount of noise to screen-reader users without providing useful
   * information.
   */
  _getAriaSelected() {
    return this.selected || (this.multiple ? false : null);
  }
  /** Returns the correct tabindex for the option depending on disabled state. */
  _getTabIndex() {
    return this.disabled ? '-1' : '0';
  }
  /** Gets the host DOM element. */
  _getHostElement() {
    return this._element.nativeElement;
  }
  ngAfterViewChecked() {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `tak-select`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    if (this._selected) {
      const viewValue = this.viewValue;
      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }
    }
  }
  ngOnDestroy() {
    this._stateChanges.complete();
  }
  /** Emits the selection change event. */
  _emitSelectionChangeEvent(isUserInput = false) {
    this.onSelectionChange.emit(new TakOptionSelectionChange(this, isUserInput));
  }
}
_TakOptionBase.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakOptionBase,
  deps: 'invalid',
  target: i0.ɵɵFactoryTarget.Directive,
});
_TakOptionBase.ɵdir = i0.ɵɵngDeclareDirective({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: _TakOptionBase,
  inputs: { value: 'value', id: 'id', disabled: 'disabled' },
  outputs: { onSelectionChange: 'onSelectionChange' },
  ngImport: i0,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: _TakOptionBase,
  decorators: [
    {
      type: Directive,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      { type: undefined },
      { type: _TakOptgroupBase },
    ];
  },
  propDecorators: {
    value: [
      {
        type: Input,
      },
    ],
    id: [
      {
        type: Input,
      },
    ],
    disabled: [
      {
        type: Input,
      },
    ],
    onSelectionChange: [
      {
        type: Output,
      },
    ],
  },
});
/**
 * Single option inside of a `<tak-select>` element.
 */
class TakOption extends _TakOptionBase {
  constructor(element, changeDetectorRef, parent, group) {
    super(element, changeDetectorRef, parent, group);
  }
}
TakOption.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOption,
  deps: [
    { token: i0.ElementRef },
    { token: i0.ChangeDetectorRef },
    { token: TAK_OPTION_PARENT_COMPONENT, optional: true },
    { token: TAK_OPTGROUP, optional: true },
  ],
  target: i0.ɵɵFactoryTarget.Component,
});
TakOption.ɵcmp = i0.ɵɵngDeclareComponent({
  minVersion: '14.0.0',
  version: '14.2.0',
  type: TakOption,
  selector: 'tak-option',
  host: {
    attributes: { role: 'option' },
    listeners: { click: '_selectViaInteraction()', keydown: '_handleKeydown($event)' },
    properties: {
      'attr.tabindex': '_getTabIndex()',
      'class.tak-selected': 'selected',
      'class.tak-option-multiple': 'multiple',
      'class.tak-active': 'active',
      id: 'id',
      'attr.aria-selected': '_getAriaSelected()',
      'attr.aria-disabled': 'disabled.toString()',
      'class.tak-option-disabled': 'disabled',
    },
    classAttribute: 'tak-option tak-focus-indicator',
  },
  exportAs: ['takOption'],
  usesInheritance: true,
  ngImport: i0,
  template:
    '<tak-pseudo-checkbox *ngIf="multiple" class="tak-option-pseudo-checkbox"\n    [state]="selected ? \'checked\' : \'unchecked\'" [disabled]="disabled"></tak-pseudo-checkbox>\n\n<span class="tak-option-text"><ng-content></ng-content></span>\n\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class="cdk-visually-hidden" *ngIf="group && group._inert">({{ group.label }})</span>\n\n<div class="tak-option-ripple" tak-ripple\n     [takRippleTrigger]="_getHostElement()"\n     [takRippleDisabled]="disabled || disableRipple">\n</div>\n',
  styles: [
    '.tak-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-option[disabled]{cursor:default}[dir=rtl] .tak-option{text-align:right}.tak-option .tak-icon{margin-right:16px;vertical-align:middle}.tak-option .tak-icon svg{vertical-align:top}[dir=rtl] .tak-option .tak-icon{margin-left:16px;margin-right:0}.tak-option[aria-disabled=true]{-webkit-user-select:none;user-select:none;cursor:default}.tak-optgroup .tak-option:not(.tak-option-multiple){padding-left:32px}[dir=rtl] .tak-optgroup .tak-option:not(.tak-option-multiple){padding-left:16px;padding-right:32px}.tak-option.tak-active::before{content:""}.cdk-high-contrast-active .tak-option[aria-disabled=true]{opacity:.5}.cdk-high-contrast-active .tak-option.tak-selected:not(.tak-option-multiple)::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}[dir=rtl] .cdk-high-contrast-active .tak-option.tak-selected:not(.tak-option-multiple)::after{right:auto;left:16px}.tak-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis}.tak-option .tak-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-option-pseudo-checkbox{margin-right:8px}[dir=rtl] .tak-option-pseudo-checkbox{margin-left:8px;margin-right:0}',
  ],
  dependencies: [
    {
      kind: 'directive',
      type: TakRipple,
      selector: '[tak-ripple], [takRipple]',
      inputs: [
        'takRippleColor',
        'takRippleUnbounded',
        'takRippleCentered',
        'takRippleRadius',
        'takRippleAnimation',
        'takRippleDisabled',
        'takRippleTrigger',
      ],
      exportAs: ['takRipple'],
    },
    {
      kind: 'directive',
      type: i3.NgIf,
      selector: '[ngIf]',
      inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
    },
    {
      kind: 'component',
      type: TakPseudoCheckbox,
      selector: 'tak-pseudo-checkbox',
      inputs: ['state', 'disabled'],
    },
  ],
  changeDetection: i0.ChangeDetectionStrategy.OnPush,
  encapsulation: i0.ViewEncapsulation.None,
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOption,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'tak-option',
          exportAs: 'takOption',
          host: {
            role: 'option',
            '[attr.tabindex]': '_getTabIndex()',
            '[class.tak-selected]': 'selected',
            '[class.tak-option-multiple]': 'multiple',
            '[class.tak-active]': 'active',
            '[id]': 'id',
            '[attr.aria-selected]': '_getAriaSelected()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class.tak-option-disabled]': 'disabled',
            '(click)': '_selectViaInteraction()',
            '(keydown)': '_handleKeydown($event)',
            class: 'tak-option tak-focus-indicator',
          },
          encapsulation: ViewEncapsulation.None,
          changeDetection: ChangeDetectionStrategy.OnPush,
          template:
            '<tak-pseudo-checkbox *ngIf="multiple" class="tak-option-pseudo-checkbox"\n    [state]="selected ? \'checked\' : \'unchecked\'" [disabled]="disabled"></tak-pseudo-checkbox>\n\n<span class="tak-option-text"><ng-content></ng-content></span>\n\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class="cdk-visually-hidden" *ngIf="group && group._inert">({{ group.label }})</span>\n\n<div class="tak-option-ripple" tak-ripple\n     [takRippleTrigger]="_getHostElement()"\n     [takRippleDisabled]="disabled || disableRipple">\n</div>\n',
          styles: [
            '.tak-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.tak-option[disabled]{cursor:default}[dir=rtl] .tak-option{text-align:right}.tak-option .tak-icon{margin-right:16px;vertical-align:middle}.tak-option .tak-icon svg{vertical-align:top}[dir=rtl] .tak-option .tak-icon{margin-left:16px;margin-right:0}.tak-option[aria-disabled=true]{-webkit-user-select:none;user-select:none;cursor:default}.tak-optgroup .tak-option:not(.tak-option-multiple){padding-left:32px}[dir=rtl] .tak-optgroup .tak-option:not(.tak-option-multiple){padding-left:16px;padding-right:32px}.tak-option.tak-active::before{content:""}.cdk-high-contrast-active .tak-option[aria-disabled=true]{opacity:.5}.cdk-high-contrast-active .tak-option.tak-selected:not(.tak-option-multiple)::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}[dir=rtl] .cdk-high-contrast-active .tak-option.tak-selected:not(.tak-option-multiple)::after{right:auto;left:16px}.tak-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis}.tak-option .tak-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.tak-option-pseudo-checkbox{margin-right:8px}[dir=rtl] .tak-option-pseudo-checkbox{margin-left:8px;margin-right:0}',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.ElementRef },
      { type: i0.ChangeDetectorRef },
      {
        type: undefined,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_OPTION_PARENT_COMPONENT],
          },
        ],
      },
      {
        type: TakOptgroup,
        decorators: [
          {
            type: Optional,
          },
          {
            type: Inject,
            args: [TAK_OPTGROUP],
          },
        ],
      },
    ];
  },
});
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
  if (optionGroups.length) {
    let optionsArray = options.toArray();
    let groups = optionGroups.toArray();
    let groupCounter = 0;
    for (let i = 0; i < optionIndex + 1; i++) {
      if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
        groupCounter++;
      }
    }
    return groupCounter;
  }
  return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionOffset, optionHeight, currentScrollPosition, panelHeight) {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }
  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }
  return currentScrollPosition;
}

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class TakOptionModule {}
TakOptionModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOptionModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule,
});
TakOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOptionModule,
  declarations: [TakOption, TakOptgroup],
  imports: [TakRippleModule, CommonModule, TakCommonModule, TakPseudoCheckboxModule],
  exports: [TakOption, TakOptgroup],
});
TakOptionModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOptionModule,
  imports: [TakRippleModule, CommonModule, TakCommonModule, TakPseudoCheckboxModule],
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.0',
  ngImport: i0,
  type: TakOptionModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [TakRippleModule, CommonModule, TakCommonModule, TakPseudoCheckboxModule],
          exports: [TakOption, TakOptgroup],
          declarations: [TakOption, TakOptgroup],
        },
      ],
    },
  ],
});

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Developed by Google LLC but not supported.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
  AnimationCurves,
  AnimationDurations,
  DateAdapter,
  ErrorStateMatcher,
  TAKERIAL_SANITY_CHECKS,
  TAK_DATE_FORTAKS,
  TAK_DATE_LOCALE,
  TAK_DATE_LOCALE_FACTORY,
  TAK_NATIVE_DATE_FORTAKS,
  TAK_OPTGROUP,
  TAK_OPTION_PARENT_COMPONENT,
  TAK_RIPPLE_GLOBAL_OPTIONS,
  TakCommonModule,
  TakLine,
  TakLineModule,
  TakNativeDateModule,
  TakOptgroup,
  TakOption,
  TakOptionModule,
  TakOptionSelectionChange,
  TakPseudoCheckbox,
  TakPseudoCheckboxModule,
  TakRipple,
  TakRippleModule,
  NativeDateAdapter,
  NativeDateModule,
  RippleRef,
  RippleRenderer,
  ShowOnDirtyErrorStateMatcher,
  VERSION,
  _TakOptgroupBase,
  _TakOptionBase,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition,
  defaultRippleAnimationConfig,
  mixinColor,
  mixinDisableRipple,
  mixinDisabled,
  mixinErrorState,
  mixinInitialized,
  mixinTabIndex,
  setLines,
};
//# sourceMappingURL=core.mjs.map
