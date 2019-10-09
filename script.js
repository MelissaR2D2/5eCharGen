var app = new Vue({
    el: '#app',
    data: {
        myClasses: [],
    },
    methods: {
        fetchREST() {
            var cors = "https://cors-anywhere.herokuapp.com/";
            const url = cors + "http://dnd5eapi.co/api/classes/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    console.log(json.results);
                    for (let i = 0; i < json.results.length; i++) {
                        console.log(json.results[i]);
                        this.myClasses.push(json.results[i]);
                    }
                });
        },
    },
});
