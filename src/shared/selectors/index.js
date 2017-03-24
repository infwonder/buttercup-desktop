import { createSelector } from 'reselect';
import { filterByText, sortByKey, sortRecursivelyByKey } from '../utils/collection';

// Archive ->

export const getAllArchives = state => Object.values(state.archives);
export const getCurrentArchiveId = state => state.currentArchive;
export const getCurrentArchive = createSelector(
  state => state.archives,
  getCurrentArchiveId,
  (archives, archiveId) => archives[archiveId] || null
);

// Settings ->

export const getAllSettings = state => state.settingsByArchiveId;
export const getCurrentArchiveSettings = createSelector(
  getAllSettings,
  getCurrentArchiveId,
  (settings, archiveId) => settings[archiveId]
);

// Tree ->

export const getExpandedKeys = createSelector(
  getCurrentArchiveSettings,
  archive => archive ? archive.ui.treeExpandedKeys : []
);

// Entries ->

export const getAllEntries = state => state.entries.byId;
export const getCurrentEntryId = state => state.entries.currentEntry;

export const getCurrentEntry = createSelector(
  getAllEntries,
  getCurrentEntryId,
  (entries, entryId) => entries[entryId]
);

export const getVisibleEntries = createSelector(
  getAllEntries,
  state => state.entries.shownIds,
  (entries, ids) => ids.map(id => entries[id])
);

export const getEntries = createSelector(
  getVisibleEntries,
  state => state.entries.filter,
  state => state.entries.sortMode,
  (entries, filter, sortMode) => {
    if (filter && filter.length > 0) {
      return filterByText(entries, filter);
    }

    return sortByKey(entries, sortMode);
  }
);

// Groups ->

export const getAllGroups = state => state.groups.byId;
export const getCurrentGroupId = state => state.groups.currentGroup;

// @TODO: This doesn't work yet.
// export const getCurrentGroup = createSelector(
//   getAllGroups,
//   getCurrentGroupId,
//   (groups, groupId) => groups[groupId]
// );

export const getGroups = createSelector(
  getAllGroups,
  state => state.groups.sortMode,
  (groups, sortMode) => {
    const trashGroups = groups.filter(g => g.isTrash);
    const rest = groups.filter(g => !g.isTrash);
    return [
      ...sortRecursivelyByKey(rest, sortMode, 'groups'),
      ...trashGroups
    ];
  }
);
