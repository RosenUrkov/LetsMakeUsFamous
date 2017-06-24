const { Area } = require('../area');
const initParser = require('../../dom-parser');

Area.fromHtml = (html) => {
    return initParser(html)
        .then($ => {
            const areas = [];
            $('h2 > a').each((_, elem) => {
                const $elem = $(elem);
                
                const name = $elem.text().trim();
                const route = $elem.attr('href').substring('/objects-po-oblasti/'.length);
                
                const area = new Area(name, route);
                areas.push(area);
            });

            return areas;
        });
};