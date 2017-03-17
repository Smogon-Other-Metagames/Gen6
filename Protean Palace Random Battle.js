	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onPrepareHitPriority: -1,
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (!type) return;
			if (type === '???') return;
			if (source.getTypes().join() === type) return;
			if (!source.setType(type)) return;
			this.add('-start', source, 'typechange', type);
		},
	},
