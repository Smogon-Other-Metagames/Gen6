	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onDamage: function (damage, target, source, effect) {
			let type;
			switch (effect.id) {
			default:
				return;
			case 'blacksludge':
				type = 'Poison';
				damage = target.maxhp / 8;
				break;
			case 'curse':
			case 'nightmare':
				type = 'Ghost';
				damage = target.maxhp / 4;
				break;
			case 'leechseed':
			case 'spikyshield':
				type = 'Grass';
				damage = target.maxhp / 8;
				break;
			case 'spikes':
				type = 'Ground';
				damage = target.maxhp / 2 / (5 - target.side.sideConditions.spikes.layers);
				break;
			case 'brn':
				type = 'Fire';
				damage = target.maxhp / 8;
				break;
			case 'psn':
				type = 'Poison';
				damage = target.maxhp / 8;
				break;
			case 'tox':
				return this.clampIntRange(target.maxhp >> 4 - this.getEffectiveness('Poison', target), 1) * target.statusData.stage;
			case 'partiallytrapped':
				let effectData = target.volatiles.partiallytrapped;
				damage = target.maxhp / (effectData.source.hasItem('bindingband') ? 6 : 8);
				type = effectData.sourceEffect;
				break;
			case 'sandstorm':
				type = 'Rock';
				damage = target.maxhp / 16;
				break;
			case 'hail':
				type = 'Ice';
				damage = target.maxhp / 16;
				break;
			case 'recoil':
				type = this.activeMove;
				break;
			}
			return damage * Math.pow(2, this.getEffectiveness(type, target));
		},
	},
