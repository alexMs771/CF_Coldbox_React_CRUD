<cfcomponent output="false">
	<cffunction name = "getAll" access="public" returnType="any">
		<cfquery name="qGetAll" datasource="coldboxdb">
			SELECT id, name, email
			FROM users
		</cfquery>
		<cfreturn qGetAll.recordCount ? qGetAll : []>
	</cffunction>
	<cffunction name = "create" access="public" returnType="any">
		<cfargument name="name" type="string" required="true">
		<cfargument name="email" type="string" required="true">
		<cfquery datasource="coldboxdb">
			INSERT INTO users (name, email)
			VALUES (<cfqueryparam value="#arguments.name#" cfsqltype="cf_sql_varchar">,
					<cfqueryparam value="#arguments.email#" cfsqltype="cf_sql_varchar">)
		</cfquery>
	</cffunction>
	<cffunction name = "update" access="public" returnType="any">
		<cfargument name="id" type="numeric" required="true">
		<cfargument name="name" type="string" required="true">
		<cfargument name="email" type="string" required="true">
		<cfquery datasource="coldboxdb">
			UPDATE users
			SET name = <cfqueryparam value="#arguments.name#" cfsqltype="cf_sql_varchar">, email = <cfqueryparam value="#arguments.email#" cfsqltype="cf_sql_varchar">
			WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
		</cfquery>
	</cffunction>
	<cffunction name = "delete" access="public" returnType="any">
		<cfargument name="id" type="numeric" required="true">
		<cfquery datasource="coldboxdb">
			DELETE FROM users
			WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
		</cfquery>
	</cffunction>
</cfcomponent>