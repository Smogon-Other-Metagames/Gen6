	{
		ruleset: ['OU'],
		banlist: [
			'Hail', 'Rain Dance', 'Sandstorm', 'Sunny Day',
			'Cloud Nine', 'Drizzle', 'Drought', 'Sand Stream', 'Snow Warning',
			'Mega Abomasnow', 'Mega Charizard Y', 'Mega Tyranitar',
		],
		onBegin: function () {
			this.setWeather('hail');
		},
		onResidualOrder: 999,
		onResidual: function () {
			if (this.turn % 3) return;
			this.setWeather(['hail', 'sunnyday', 'sandstorm', 'raindance'][this.turn / 3 % 4]);
		},
	},
