import {TeamModel} from "../Models/TeamModel"
import {GroupsProps} from "../Types/GroupsProps"

export function fromLocalStorage() {
	const sortItems = (items: TeamModel[]) => items.sort((a, b) => b.score - a.score)
	return {
		groups: {
			get: localStorage.groups && JSON.parse(localStorage.groups),
			set: (items: TeamModel[]) => {
				return (localStorage.groups = JSON.stringify({
					A: items.filter(team => team.group === "A"),
					B: items.filter(team => team.group === "B"),
					C: items.filter(team => team.group === "C"),
					D: items.filter(team => team.group === "D"),
					E: items.filter(team => team.group === "E"),
					F: items.filter(team => team.group === "F"),
					G: items.filter(team => team.group === "G"),
					H: items.filter(team => team.group === "H"),
				}))
			},
		},
		huitieme: {
			get: localStorage.groups && JSON.parse(localStorage.groups),
			set: (items: GroupsProps) => {
				return (localStorage.huitieme = JSON.stringify({
					A: [sortItems(items.A)[0], sortItems(items.B)[1]],
					B: [sortItems(items.C)[0], sortItems(items.D)[1]],
					C: [sortItems(items.E)[0], sortItems(items.F)[1]],
					D: [sortItems(items.G)[0], sortItems(items.H)[1]],
					E: [sortItems(items.B)[0], sortItems(items.A)[1]],
					F: [sortItems(items.D)[0], sortItems(items.C)[1]],
					G: [sortItems(items.F)[0], sortItems(items.E)[1]],
					H: [sortItems(items.H)[0], sortItems(items.G)[1]],
				}))
			},
		},
		quart: {
			get: localStorage.huitieme && JSON.parse(localStorage.huitieme),
			set: (quart: GroupsProps) => {
				return (localStorage.quart = JSON.stringify({
					A: [sortItems(quart.A)[0], sortItems(quart.B)[0]],
					B: [sortItems(quart.C)[0], sortItems(quart.D)[0]],
					C: [sortItems(quart.E)[0], sortItems(quart.F)[0]],
					D: [sortItems(quart.G)[0], sortItems(quart.H)[0]],
				}))
			},
		},
		demi: {
			get: localStorage.quart && JSON.parse(localStorage.quart),
			set: (demi: GroupsProps) => {
				return (localStorage.demi = JSON.stringify({
					A: [sortItems(demi.A)[0], sortItems(demi.B)[0]],
					B: [sortItems(demi.C)[0], sortItems(demi.D)[0]],
				}))
			},
		},
		finale: {
			get: localStorage.demi && JSON.parse(localStorage.demi),
			set: (finale: GroupsProps) => {
				return (localStorage.finale = JSON.stringify({
					A: [sortItems(finale.A)[0], sortItems(finale.B)[0]],
				}))
			},
		},
		winner: {
			get: localStorage.finale && JSON.parse(localStorage.finale),
			set: (winner: GroupsProps) => {
				return (localStorage.winner = JSON.stringify({
					winner: sortItems(winner.A)[0],
				}))
			},
		},
	}
}
