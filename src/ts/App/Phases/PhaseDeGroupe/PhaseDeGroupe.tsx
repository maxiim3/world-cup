import {GroupTable} from "../../../Template/GroupTable"
import {Tools} from "../../../Utils/Tools"
import React, {useEffect, useState} from "react"
import {GroupsProps} from "../../../Types/GroupsProps"

export function PhaseDeGroupe() {
	const [groups, setGroups] = useState<GroupsProps | null>(null)
	useEffect(() => {
		localStorage.groups && setGroups(JSON.parse(localStorage.groups))
	}, [setGroups])

	if (!groups) return <h2>Loading</h2>

	return (
		<>
			<GroupTable
				key={Tools.generateId("a")}
				id={"A"}
				teams={groups.A}
			/>
			<GroupTable
				key={Tools.generateId("b")}
				id={"B"}
				teams={groups.B}
			/>
			<GroupTable
				key={Tools.generateId("c")}
				id={"C"}
				teams={groups.C}
			/>
			<GroupTable
				key={Tools.generateId("d")}
				id={"D"}
				teams={groups.D}
			/>
			<GroupTable
				key={Tools.generateId("e")}
				id={"E"}
				teams={groups.E}
			/>
			<GroupTable
				key={Tools.generateId("f")}
				id={"F"}
				teams={groups.F}
			/>
			<GroupTable
				key={Tools.generateId("g")}
				id={"G"}
				teams={groups.G}
			/>
			<GroupTable
				key={Tools.generateId("h")}
				id={"H"}
				teams={groups.H}
			/>
		</>
	)
}
