<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import {
    ArrowLeft,
    Save,
    Users,
    Pencil,
    Phone,
    MapPin,
    UserRound,
} from "@lucide/vue";

import {
    getCommittees,
    updateCommitteeMember,
} from "@/composables/committeeService";

import { committeePositions } from "@/constants/committeePositions.js";

import { useToast } from "@/composables/useToast";

const route = useRoute();
const router = useRouter();

const { success, warning, error } = useToast();

// =====================================================
// State
// =====================================================

const committees = ref([]);
const loading = ref(true);
const submitting = ref(false);

const form = reactive({
    committeeId: "",
    type: "",
    memberId: "",
    name: "",
    designation: "",
    mobile: "",
    address: "",
});

const errors = reactive({
    name: "",
    designation: "",
    mobile: "",
});

// =====================================================
// Committee Types
// =====================================================

const committeeTypes = [
    {
        value: "advisors",
        label: "উপদেষ্টা মণ্ডলী",
    },
    {
        value: "executiveCommittee",
        label: "কার্যনির্বাহী কমিটি",
    },
    {
        value: "members",
        label: "সদস্যবৃন্দ",
    },
];

// =====================================================
// Load Member
// =====================================================

onMounted(async () => {
    loading.value = true;

    try {
        committees.value = await getCommittees();

        form.committeeId = route.params.committeeId;
        form.type = route.params.type;
        form.memberId = route.params.memberId;

        // ---------------------------------------------
        // Find Committee
        // ---------------------------------------------

        const committee = committees.value.find(
            (item) =>
                String(item.id) ===
                String(form.committeeId)
        );

        if (!committee) {
            error("Committee not found.");

            router.push({
                name: "CommitteeMemberList",
            });

            return;
        }

        // ---------------------------------------------
        // Find Committee Type
        // ---------------------------------------------

        const members = committee[form.type];

        if (!Array.isArray(members)) {
            error("Invalid committee type.");

            router.push({
                name: "CommitteeMemberList",
            });

            return;
        }

        // ---------------------------------------------
        // Find Member
        // ---------------------------------------------

        const member = members.find(
            (item) =>
                String(item.id) ===
                String(form.memberId)
        );

        if (!member) {
            error("Committee member not found.");

            router.push({
                name: "CommitteeMemberList",
            });

            return;
        }

        // ---------------------------------------------
        // Fill Form
        // ---------------------------------------------

        form.name = member.name || "";
        form.designation = member.designation || "";
        form.mobile = member.mobile || "";
        form.address = member.address || "";

    } catch (err) {
        console.error(err);

        error(
            err.message ||
            "Failed to load committee member."
        );
    } finally {
        loading.value = false;
    }
});

// =====================================================
// Selected Committee
// =====================================================

const selectedCommittee = computed(() => {
    return committees.value.find(
        (committee) =>
            String(committee.id) ===
            String(form.committeeId)
    );
});

// =====================================================
// Selected Type Label
// =====================================================

const selectedTypeLabel = computed(() => {
    return (
        committeeTypes.find(
            (type) =>
                type.value === form.type
        )?.label || ""
    );
});

// =====================================================
// Designation Options
// =====================================================

const designationOptionsForType = computed(() => {
    return committeePositions[form.type] || [];
});

// =====================================================
// Is Fixed Designation
// =====================================================

const hasDesignationOptions = computed(() => {
    return designationOptionsForType.value.length > 0;
});

// =====================================================
// Validation
// =====================================================

const validate = () => {
    Object.keys(errors).forEach((key) => {
        errors[key] = "";
    });

    let valid = true;

    if (!form.name.trim()) {
        errors.name =
            "Member name is required.";

        valid = false;
    }

    if (!form.designation.trim()) {
        errors.designation =
            "Designation is required.";

        valid = false;
    }

    if (!form.mobile.trim()) {
        errors.mobile =
            "Mobile number is required.";

        valid = false;
    }

    return valid;
};

// =====================================================
// Submit
// =====================================================

const submit = async () => {
    if (!validate()) {
        warning(
            "Please fill in all required fields."
        );

        return;
    }

    submitting.value = true;

    try {
        await updateCommitteeMember({
            committeeId: form.committeeId,
            type: form.type,
            memberId: form.memberId,
            name: form.name.trim(),
            designation: form.designation,
            mobile: form.mobile.trim(),
            address: form.address.trim(),
        });

        success(
            "Committee member updated successfully."
        );

        router.push({
            name: "CommitteeMemberList",
        });

    } catch (err) {
        console.error(err);

        error(
            err.message ||
            "Failed to update committee member."
        );
    } finally {
        submitting.value = false;
    }
};

// =====================================================
// Cancel
// =====================================================

const cancel = () => {
    router.push({
        name: "CommitteeMemberList",
    });
};
</script>

<template>
    <div class="min-h-full p-4 sm:p-6 lg:p-8">

        <!-- ================================================= -->
        <!-- Page Header -->
        <!-- ================================================= -->

        <div
            class="mx-auto mb-6 max-w-5xl"
        >
            <div
                class="flex items-start gap-3"
            >
                <RouterLink
                    :to="{
                        name: 'CommitteeMemberList',
                    }"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                    <ArrowLeft :size="18" />
                </RouterLink>

                <div>
                    <div
                        class="flex items-center gap-2"
                    >
                        <div
                            class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                        >
                            <Pencil :size="17" />
                        </div>

                        <h1
                            class="text-xl font-bold tracking-tight text-white sm:text-2xl"
                        >
                            Edit Committee Member
                        </h1>
                    </div>

                    <p
                        class="mt-1 text-sm text-slate-400"
                    >
                        Update the committee member's
                        information and designation.
                    </p>
                </div>
            </div>
        </div>

        <!-- ================================================= -->
        <!-- Loading -->
        <!-- ================================================= -->

        <div
            v-if="loading"
            class="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/60 p-12 text-center"
        >
            <div
                class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"
            ></div>

            <p
                class="mt-4 text-sm text-slate-500"
            >
                Loading member information...
            </p>
        </div>

        <!-- ================================================= -->
        <!-- Form -->
        <!-- ================================================= -->

        <form
            v-else
            @submit.prevent="submit"
            class="mx-auto max-w-5xl space-y-5"
        >

            <!-- ================================================= -->
            <!-- Committee Information -->
            <!-- ================================================= -->

            <section
                class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60"
            >
                <!-- Section Header -->

                <div
                    class="border-b border-white/10 px-5 py-4 sm:px-6"
                >
                    <div
                        class="flex items-center gap-3"
                    >
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                        >
                            <Users :size="19" />
                        </div>

                        <div>
                            <h2
                                class="text-sm font-semibold text-white"
                            >
                                Committee Information
                            </h2>

                            <p
                                class="mt-1 text-xs text-slate-500"
                            >
                                Information about the
                                committee assignment.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Committee Details -->

                <div
                    class="grid gap-4 p-5 sm:grid-cols-2 sm:p-6"
                >

                    <!-- Year -->

                    <div
                        class="rounded-xl border border-white/10 bg-slate-950/40 p-4"
                    >
                        <div
                            class="flex items-center gap-2"
                        >
                            <Users
                                :size="15"
                                class="text-slate-500"
                            />

                            <p
                                class="text-xs text-slate-500"
                            >
                                Committee Year
                            </p>
                        </div>

                        <p
                            class="mt-2 text-sm font-semibold text-white"
                        >
                            {{
                                selectedCommittee?.year ||
                                "—"
                            }}
                        </p>
                    </div>

                    <!-- Type -->

                    <div
                        class="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4"
                    >
                        <div
                            class="flex items-center gap-2"
                        >
                            <UserRound
                                :size="15"
                                class="text-cyan-400"
                            />

                            <p
                                class="text-xs text-slate-500"
                            >
                                Committee Type
                            </p>
                        </div>

                        <p
                            class="mt-2 text-sm font-semibold text-cyan-400"
                        >
                            {{ selectedTypeLabel || "—" }}
                        </p>
                    </div>

                </div>
            </section>

            <!-- ================================================= -->
            <!-- Member Information -->
            <!-- ================================================= -->

            <section
                class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60"
            >

                <!-- Header -->

                <div
                    class="border-b border-white/10 px-5 py-4 sm:px-6"
                >
                    <h2
                        class="text-sm font-semibold text-white"
                    >
                        Member Information
                    </h2>

                    <p
                        class="mt-1 text-xs text-slate-500"
                    >
                        Update personal and contact
                        information.
                    </p>
                </div>

                <!-- Form Fields -->

                <div
                    class="grid gap-5 p-5 sm:grid-cols-2 sm:p-6"
                >

                    <!-- ================================================= -->
                    <!-- Name -->
                    <!-- ================================================= -->

                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Full Name
                            <span
                                class="text-red-400"
                            >
                                *
                            </span>
                        </label>

                        <input
                            v-model="form.name"
                            type="text"
                            placeholder="Enter member name"
                            class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            :class="{
                                'border-red-500/40':
                                    errors.name,
                            }"
                        />

                        <p
                            v-if="errors.name"
                            class="mt-1.5 text-xs text-red-400"
                        >
                            {{ errors.name }}
                        </p>
                    </div>

                    <!-- ================================================= -->
                    <!-- Designation -->
                    <!-- ================================================= -->

                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Designation
                            <span
                                class="text-red-400"
                            >
                                *
                            </span>
                        </label>

                        <!-- Fixed Designation -->

                        <select
                            v-if="hasDesignationOptions"
                            v-model="form.designation"
                            class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            :class="{
                                'border-red-500/40':
                                    errors.designation,
                            }"
                        >
                            <option
                                value=""
                                disabled
                            >
                                Select designation
                            </option>

                            <option
                                v-for="designation in designationOptionsForType"
                                :key="designation"
                                :value="designation"
                            >
                                {{ designation }}
                            </option>
                        </select>

                        <!-- Custom Designation -->

                        <input
                            v-else
                            v-model="form.designation"
                            type="text"
                            placeholder="Enter designation"
                            class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            :class="{
                                'border-red-500/40':
                                    errors.designation,
                            }"
                        />

                        <p
                            v-if="errors.designation"
                            class="mt-1.5 text-xs text-red-400"
                        >
                            {{ errors.designation }}
                        </p>

                        <p
                            v-if="hasDesignationOptions"
                            class="mt-1.5 text-[11px] text-slate-600"
                        >
                            Select a predefined
                            designation for this
                            committee type.
                        </p>
                    </div>

                    <!-- ================================================= -->
                    <!-- Mobile -->
                    <!-- ================================================= -->

                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Mobile Number
                            <span
                                class="text-red-400"
                            >
                                *
                            </span>
                        </label>

                        <div class="relative">
                            <Phone
                                :size="16"
                                class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                            />

                            <input
                                v-model="form.mobile"
                                type="text"
                                placeholder="Enter mobile number"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                                :class="{
                                    'border-red-500/40':
                                        errors.mobile,
                                }"
                            />
                        </div>

                        <p
                            v-if="errors.mobile"
                            class="mt-1.5 text-xs text-red-400"
                        >
                            {{ errors.mobile }}
                        </p>
                    </div>

                    <!-- ================================================= -->
                    <!-- Address -->
                    <!-- ================================================= -->

                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Address
                        </label>

                        <div class="relative">
                            <MapPin
                                :size="16"
                                class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                            />

                            <input
                                v-model="form.address"
                                type="text"
                                placeholder="Enter address"
                                class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                            />
                        </div>
                    </div>

                </div>
            </section>

            <!-- ================================================= -->
            <!-- Actions -->
            <!-- ================================================= -->

            <div
                class="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end"
            >

                <button
                    type="button"
                    @click="cancel"
                    class="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    :disabled="submitting"
                    class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span
                        v-if="submitting"
                        class="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                    ></span>

                    <Save
                        v-else
                        :size="17"
                    />

                    {{
                        submitting
                            ? "Updating..."
                            : "Update Member"
                    }}
                </button>

            </div>

        </form>
    </div>
</template>