import { committees as initialCommittees } from "@/constants/committeeData.js";

const STORAGE_KEY = "alumni_committees";

// =====================================================
// Helpers
// =====================================================

const cloneData = (data) => JSON.parse(JSON.stringify(data));

const getStoredCommittees = () => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        const initialData = cloneData(initialCommittees);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialData)
        );

        return initialData;
    }

    try {
        return JSON.parse(stored);
    } catch (error) {
        console.error(
            "Failed to parse committee data:",
            error
        );

        const initialData = cloneData(initialCommittees);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialData)
        );

        return initialData;
    }
};

const saveCommittees = (data) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
};

// =====================================================
// Get All Committees
// =====================================================

export const getCommittees = async () => {
    return cloneData(getStoredCommittees());
};

// =====================================================
// Get Single Committee
// =====================================================

export const getCommittee = async (id) => {
    const committees = getStoredCommittees();

    const committee = committees.find(
        (committee) =>
            Number(committee.id) === Number(id)
    );

    return committee
        ? cloneData(committee)
        : null;
};

// =====================================================
// Create Committee Member
// =====================================================

export const createCommitteeMember = async ({
    committeeId,
    type,
    name,
    designation,
    mobile,
    address,
}) => {
    const committees = getStoredCommittees();

    const committee = committees.find(
        (item) =>
            Number(item.id) === Number(committeeId)
    );

    if (!committee) {
        throw new Error("Committee not found.");
    }

    // =================================================
    // IMPORTANT:
    // Archived Committee cannot receive new members
    // =================================================

    if (committee.status !== "active") {
        throw new Error(
            "Archived committee members cannot be added."
        );
    }

    if (!committee[type]) {
        throw new Error("Invalid committee type.");
    }

    if (!name?.trim()) {
        throw new Error("Member name is required.");
    }

    if (!designation?.trim()) {
        throw new Error("Member designation is required.");
    }

    const members = committee[type];

    const newId =
        members.length > 0
            ? Math.max(
                ...members.map(
                    (member) =>
                        Number(member.id) || 0
                )
            ) + 1
            : 1;

    const newMember = {
        id: newId,
        name: name.trim(),
        designation: designation.trim(),
        mobile: mobile?.trim() || null,
        address: address?.trim() || null,
    };

    committee[type].push(newMember);

    saveCommittees(committees);

    return cloneData(newMember);
};

// =====================================================
// Update Committee Member
// =====================================================

export const updateCommitteeMember = async ({
    committeeId,
    type,
    memberId,
    name,
    designation,
    mobile,
    address,
}) => {
    const committees = getStoredCommittees();

    const committee = committees.find(
        (item) =>
            Number(item.id) === Number(committeeId)
    );

    if (!committee) {
        throw new Error("Committee not found.");
    }

    // =================================================
    // IMPORTANT:
    // Archived Committee cannot be edited
    // =================================================

    if (committee.status !== "active") {
        throw new Error(
            "Archived committee members cannot be edited."
        );
    }

    const members = committee[type];

    if (!members) {
        throw new Error("Invalid committee type.");
    }

    const member = members.find(
        (item) =>
            Number(item.id) === Number(memberId)
    );

    if (!member) {
        throw new Error(
            "Committee member not found."
        );
    }

    if (!name?.trim()) {
        throw new Error("Member name is required.");
    }

    if (!designation?.trim()) {
        throw new Error(
            "Member designation is required."
        );
    }

    member.name = name.trim();
    member.designation = designation.trim();
    member.mobile = mobile?.trim() || null;
    member.address = address?.trim() || null;

    saveCommittees(committees);

    return cloneData(member);
};

// =====================================================
// Delete Committee Member
// =====================================================

export const deleteCommitteeMember = async ({
    committeeId,
    type,
    memberId,
}) => {
    const committees = getStoredCommittees();

    const committee = committees.find(
        (item) =>
            Number(item.id) === Number(committeeId)
    );

    if (!committee) {
        throw new Error("Committee not found.");
    }

    // =================================================
    // IMPORTANT:
    // Archived Committee cannot be deleted
    // =================================================

    if (committee.status !== "active") {
        throw new Error(
            "Archived committee members cannot be deleted."
        );
    }

    const members = committee[type];

    if (!members) {
        throw new Error("Invalid committee type.");
    }

    const index = members.findIndex(
        (item) =>
            Number(item.id) === Number(memberId)
    );

    if (index === -1) {
        throw new Error(
            "Committee member not found."
        );
    }

    members.splice(index, 1);

    saveCommittees(committees);

    return true;
};

// =====================================================
// Reset Demo Data
// =====================================================

export const resetCommitteeData = async () => {
    const data = cloneData(initialCommittees);

    saveCommittees(data);

    return data;
};