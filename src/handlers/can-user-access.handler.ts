import { model } from "mongoose";

/**
 * This function checks if user can edit entity
 * we checking collection id on group entity and than
 * check if user is in that group
 *
 * @param collectionId collection id in group
 * @param userGroupId user group id which need to checek
 */
export function canUserAccess(collectionId: string, userGroupId: string) {
    if (!collectionId || !userGroupId.match(/^[0-9a-fA-F]{24}$/)) {
        return false;
    }
    // check if user in group if not don't allow access
    return model("Group")
        .findOne({ collectionIds: collectionId, _id: userGroupId })
        .then((collection: any) => {
            if (!collection) {
                return false;
            }
            return true;
        });
}
