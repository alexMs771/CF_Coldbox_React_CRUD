/**
 * I am a new handler
 * Implicit Functions: preHandler, postHandler, aroundHandler, onMissingAction, onError, onInvalidHTTPMethod
 */
component extends="coldbox.system.EventHandler"{
    property name = "UserService" inject="model:UserService";
    function index(event, rc, prc) {
	    rc.users = UserService.getAll();
       event.setView("authentication/index");
    }
    function getAll(event, rc, prc) {
       rc.users = UserService.getAll();
       event.renderData(type="json", data=rc.users);
    }

    function save(event, rc, prc) {
        if (structKeyExists(rc, "id") && rc.id > 0) {
            UserService.update(rc.id, rc.name, rc.email);
        } else {
            UserService.create(rc.name, rc.email);
        }
        relocate("authentication/index");
    }

    function delete(event, rc, prc) {
        UserService.delete(rc.id);
        relocate("authentication/index");
    }
}