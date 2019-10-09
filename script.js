var app = new Vue({
    el: '#app',
    data: {
        classNames: [],
        raceNames: [],
        classURLs: [],
        raceURLs: [],
        classSelection: "",
        raceSelection: "",
        cors: "https://cors-anywhere.herokuapp.com/",
        classes: [
            { name: 'barbarian', stat_array: [] },
        ],
        main_stats: [
            { name: 'barbarian', stats: ['STR', 'CON'] },
            { name: 'bard', stats: ['CHA', 'DEX'] },
            { name: 'cleric', stats: ['WIS', 'CON'] },
            { name: 'druid', stats: ['WIS', 'CON'] },
            { name: 'fighter', stats: ['STR', 'CON'] },
            { name: 'monk', stats: ['DEX', 'WIS'] },
            { name: 'paladin', stats: ['STR', 'CHA'] },
            { name: 'ranger', stats: ['DEX', 'WIS'] },
            { name: 'rogue', stats: ['DEX', 'INT'] },
            { name: 'sorcerer', stats: ['CHA', 'CON'] },
            { name: 'warlock', stats: ['CHA', 'CON'] },
            { name: 'wizard', stats: ['INT', 'DEX'] },
        ],
        //Yes, this is extremely arbitrary
        base_order: ['CON', 'DEX', 'WIS', 'CHA', 'INT', 'STR']
    },
    methods: {
        fetchClasses() {
            const url = this.cors + "http://dnd5eapi.co/api/classes/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    console.log(json.results);
                    for (let i = 0; i < json.results.length; i++) {
                        console.log(json.results[i]);
                        this.classNames.push(json.results[i].name);
                        this.classURLs.push(json.results[i].url);
                    }
                });
        },
        fetchRaces() {
            const url = this.cors + "http://dnd5eapi.co/api/races/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    console.log(json.results);
                    for (let i = 0; i < json.results.length; i++) {
                        console.log(json.results[i]);
                        this.raceNames.push(json.results[i].name);
                        this.raceURLs.push(json.results[i].url);
                    }
                });
        },
    },
    created: function() {
        this.fetchClasses();
        this.fetchRaces();
    }
});
