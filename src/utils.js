export default class Utils{
        /**
   * Parses an XML date string.
   * @param {string} dateString
   * @return {?number} The parsed date in seconds on success; otherwise, return
   *   null.
   */
  static parseDate(dateString) {
        if (!dateString) {
            return null;
        }

        // Times in the manifest should be in UTC. If they don't specify a timezone,
        // Date.parse() will use the local timezone instead of UTC.  So manually add
        // the timezone if missing ('Z' indicates the UTC timezone).
        // Format: YYYY-MM-DDThh:mm:ss.ssssss
        if (/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(dateString)) {
            // eslint-disable-next-line no-param-reassign
            dateString += 'Z';
        }

        const result = Date.parse(dateString);
        return (!isNaN(result) ? Math.floor(result / 1000.0) : null);
    }

    static parseDuration(durationString) {
        if (!durationString) {
            return null;
        }

        const re = '^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?' +
            '(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$';
        const matches = new RegExp(re).exec(durationString);

        if (!matches) {
            return null;
        }

        // Note: Number(null) == 0 but Number(undefined) == NaN.
        const years = Number(matches[1] || null);
        const months = Number(matches[2] || null);
        const days = Number(matches[3] || null);
        const hours = Number(matches[4] || null);
        const minutes = Number(matches[5] || null);
        const seconds = Number(matches[6] || null);

        // Assume a year always has 365 days and a month always has 30 days.
        const d = (60 * 60 * 24 * 365) * years +
            (60 * 60 * 24 * 30) * months +
            (60 * 60 * 24) * days +
            (60 * 60) * hours +
            60 * minutes +
            seconds;
        return isFinite(d) ? d : null;
    }


    static parseRange(rangeString) {
        const matches = /([0-9]+)-([0-9]+)/.exec(rangeString);

        if (!matches) {
            return null;
        }

        const start = Number(matches[1]);
        if (!isFinite(start)) {
            return null;
        }

        const end = Number(matches[2]);
        if (!isFinite(end)) {
            return null;
        }

        return { start: start, end: end };
    }
}