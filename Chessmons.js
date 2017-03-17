	{
		ruleset: ['Ubers'],
		banlist: ['Soul Dew'],
		validateSet: function (set, teamHas) {
			let format = 'OU';
			switch (toId(set.name)) {
			case 'king':
				set.name = 'King';
				break;
			case 'queen':
				set.name = 'Queen';
				format = 'Chessmons';
				break;
			case 'rook':
				set.name = 'Rook';
				format = 'OU';
				break;
			case 'bishop':
				set.name = 'Bishop';
				format = 'UU';
				break;
			case 'pawn':
				set.name = 'Pawn';
				format = 'LC';
				format = Object.assign({}, Tools.getFormat(format));
				format.maxLevel = 100;
				break;
			case 'knight':
				set.name = 'Knight';
				break;
			case '':
				return ['You must name your ' + set.species + ' one of King, Queen, Rook, Bishop, Knight or Pawn.'];
			default:
				return ['' + set.name + ' is an invalid name. It must be one of King, Queen, Rook, Bishop, Knight or Pawn.'];
			}
			return new this.constructor(format).validateSet(set, teamHas);
		},
		onValidateTeam: function (team) {
			let pieces = new Map();
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (pieces.has(name)) return ["Your Pokémon must have different nicknames.", "(You have more than one " + name + ")"];
				pieces.set(name, team[i]);
			}
			if (pieces.has('Knight')) {
				let knight = this.getTemplate(pieces.get('Knight').species);
				let problem = '';
				if (!pieces.has('Pawn')) problem = 'You have no Pawn.';
				else if (!knight.prevo) problem = '' + knight.species + ' is not an evolved Pokemon.';
				else if (knight.nfe) problem = '' + knight.species + ' is not a fully evolved Pokemon.';
				else if (knight.prevo !== toId(pieces.get('Pawn').species) && this.getTemplate(knight.prevo).prevo !== toId(pieces.get('Pawn').species)) problem = '' + knight.species + ' does not evolve from ' + pieces.get('Pawn').species + '.';
				if (problem) return ['Your Knight must be a fully evolved stage of your Pawn. (' + problem + ')'];
			}
		},
		onValidateSet: function (set) {
			if (set.name === 'King') {
				switch (toId(set.species)) {
					case 'dragonite':
					case 'garchomp':
					case 'goodra':
					case 'hydreigon':
					case 'metagross':
					case 'salamence':
					case 'tyranitar':
						break;
					default:
						return ['Your King must be one of Dragonite, Garchomp, Goodra, Hydreigon, Metagross, Salamence or Tyranitar. (Your King is ' + set.species + ').'];
				}
			} else if (set.name !== 'Queen') {
				if (Tools.getItem(set.item).megaEvolves === set.species) return ['Only your King or Queen are allowed to Mega Evolve.'];
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.name === 'King') this.win(pokemon.side.foe);
		},
	},
