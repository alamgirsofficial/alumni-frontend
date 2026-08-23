<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    MapPin,
    UserRound,
    ImagePlus,
    X,
    Plus,
    Trash2,
    Save,
    Eye,
    FileText,
    CheckCircle2,
    ListChecks,
} from "@lucide/vue";

const router = useRouter();

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const form = ref({
    title: "",
    slug: "",
    description: "",

    event_date: "",
    event_time: "",
    duration: "",

    location: "",
    organizer: "Alumni Forum",

    image: null,

    status: "upcoming",
    registration_open: true,

    highlights: [],
    schedule: [],
});

/*
|--------------------------------------------------------------------------
| UI State
|--------------------------------------------------------------------------
*/

const imageInput = ref(null);
const imagePreview = ref(null);

const highlightInput = ref("");

const scheduleForm = ref({
    time: "",
    title: "",
    description: "",
});

const errors = ref({});
const isSubmitting = ref(false);
const showPreview = ref(false);

/*
|--------------------------------------------------------------------------
| Slug
|--------------------------------------------------------------------------
*/

const generateSlug = (value) => {
    return value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const updateSlug = () => {
    form.value.slug = generateSlug(form.value.title);
};

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

const validateForm = () => {
    errors.value = {};

    if (!form.value.title.trim()) {
        errors.value.title = "Event title is required.";
    }

    if (!form.value.description.trim()) {
        errors.value.description =
            "Event description is required.";
    }

    if (!form.value.event_date) {
        errors.value.event_date =
            "Event date is required.";
    }

    if (!form.value.event_time) {
        errors.value.event_time =
            "Event time is required.";
    }

    if (!form.value.location.trim()) {
        errors.value.location =
            "Event location is required.";
    }

    if (!form.value.organizer.trim()) {
        errors.value.organizer =
            "Organizer is required.";
    }

    return Object.keys(errors.value).length === 0;
};

/*
|--------------------------------------------------------------------------
| Image
|--------------------------------------------------------------------------
*/

const openImagePicker = () => {
    imageInput.value?.click();
};

const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
    }

    form.value.image = file;

    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    imagePreview.value = URL.createObjectURL(file);
};

const removeImage = () => {
    form.value.image = null;

    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    imagePreview.value = null;

    if (imageInput.value) {
        imageInput.value.value = "";
    }
};

/*
|--------------------------------------------------------------------------
| Highlights
|--------------------------------------------------------------------------
*/

const addHighlight = () => {
    const value = highlightInput.value.trim();

    if (!value) return;

    form.value.highlights.push(value);

    highlightInput.value = "";
};

const removeHighlight = (index) => {
    form.value.highlights.splice(index, 1);
};

/*
|--------------------------------------------------------------------------
| Schedule
|--------------------------------------------------------------------------
*/

const addSchedule = () => {
    if (
        !scheduleForm.value.time ||
        !scheduleForm.value.title.trim()
    ) {
        return;
    }

    form.value.schedule.push({
        time: scheduleForm.value.time,
        title: scheduleForm.value.title.trim(),
        description:
            scheduleForm.value.description.trim(),
    });

    scheduleForm.value = {
        time: "",
        title: "",
        description: "",
    };
};

const removeSchedule = (index) => {
    form.value.schedule.splice(index, 1);
};

/*
|--------------------------------------------------------------------------
| Preview Helpers
|--------------------------------------------------------------------------
*/

const statusLabel = (status) => {
    if (status === "upcoming") return "Upcoming";

    if (status === "completed") return "Completed";

    return status;
};

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatTime = (time) => {
    if (!time) return "—";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};

const previewEvent = computed(() => ({
    ...form.value,
    image: imagePreview.value,
}));

/*
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
*/

const submitForm = async () => {
    if (!validateForm()) return;

    isSubmitting.value = true;

    try {
        /*
        |--------------------------------------------------------------------------
        | Backend API will be connected here later
        |--------------------------------------------------------------------------
        |
        | FormData example:
        |
        | const formData = new FormData();
        |
        | formData.append("title", form.value.title);
        | formData.append("slug", form.value.slug);
        | formData.append("description", form.value.description);
        | formData.append("event_date", form.value.event_date);
        | formData.append("event_time", form.value.event_time);
        | formData.append("duration", form.value.duration);
        | formData.append("location", form.value.location);
        | formData.append("organizer", form.value.organizer);
        | formData.append("status", form.value.status);
        | formData.append(
        |     "registration_open",
        |     form.value.registration_open
        | );
        |
        | if (form.value.image) {
        |     formData.append("image", form.value.image);
        | }
        |
        | formData.append(
        |     "highlights",
        |     JSON.stringify(form.value.highlights)
        | );
        |
        | formData.append(
        |     "schedule",
        |     JSON.stringify(form.value.schedule)
        | );
        |
        */

        console.log("Event Data:", form.value);

        await new Promise((resolve) =>
            setTimeout(resolve, 700),
        );

        router.push({
            name: "EventList",
        });
    } catch (error) {
        console.error(error);
    } finally {
        isSubmitting.value = false;
    }
};

/*
|--------------------------------------------------------------------------
| Cancel
|--------------------------------------------------------------------------
*/

const cancelCreate = () => {
    router.push({
        name: "EventList",
    });
};

/*
|--------------------------------------------------------------------------
| Cleanup
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }
});
</script>

<template>
    <div class="space-y-6">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->

        <div
            class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
            <div class="flex items-start gap-3">

                <button
                    type="button"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/8 hover:text-white"
                    @click="cancelCreate"
                >
                    <ArrowLeft :size="18" />
                </button>

                <div>
                    <div
                        class="flex flex-wrap items-center gap-2"
                    >
                        <h1
                            class="text-2xl font-bold tracking-tight text-white"
                        >
                            Create Event
                        </h1>

                        <span
                            class="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-400"
                        >
                            New Event
                        </span>
                    </div>

                    <p
                        class="mt-1 text-sm text-slate-500"
                    >
                        Create and publish an alumni event.
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-2">

                <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/8 hover:text-white"
                    @click="showPreview = true"
                >
                    <Eye :size="16" />

                    Preview
                </button>

                <button
                    type="button"
                    :disabled="isSubmitting"
                    class="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                    @click="submitForm"
                >
                    <Save :size="16" />

                    {{
                        isSubmitting
                            ? "Creating..."
                            : "Create Event"
                    }}
                </button>

            </div>
        </div>

        <!-- =========================================================
             FORM
        ========================================================== -->

        <form
            class="grid grid-cols-1 gap-6 xl:grid-cols-3"
            @submit.prevent="submitForm"
        >

            <!-- =====================================================
                 MAIN CONTENT
            ====================================================== -->

            <div
                class="space-y-6 xl:col-span-2"
            >

                <!-- =================================================
                     BASIC INFORMATION
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3"
                >

                    <div
                        class="border-b border-white/10 px-5 py-4 sm:px-6"
                    >
                        <div
                            class="flex items-center gap-3"
                        >
                            <div
                                class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
                            >
                                <FileText :size="18" />
                            </div>

                            <div>
                                <h2
                                    class="text-sm font-semibold text-white"
                                >
                                    Basic Information
                                </h2>

                                <p
                                    class="mt-0.5 text-xs text-slate-600"
                                >
                                    Main information about
                                    the event.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="space-y-5 p-5 sm:p-6"
                    >

                        <!-- Title -->

                        <div>
                            <label
                                class="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Event Title
                                <span class="text-red-400">
                                    *
                                </span>
                            </label>

                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="বার্ষিক পুনর্মিলনী ২০২৬"
                                class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                :class="{
                                    'border-red-500/50':
                                        errors.title,
                                }"
                                @input="updateSlug"
                            />

                            <p
                                v-if="errors.title"
                                class="mt-1.5 text-xs text-red-400"
                            >
                                {{ errors.title }}
                            </p>
                        </div>

                        <!-- Slug -->

                        <div>
                            <label
                                class="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Slug
                            </label>

                            <div class="flex">
                                <span
                                    class="flex items-center rounded-l-xl border border-r-0 border-white/10 bg-white/5 px-3 text-xs text-slate-600"
                                >
                                    events/
                                </span>

                                <input
                                    v-model="form.slug"
                                    type="text"
                                    placeholder="annual-reunion-2026"
                                    class="min-w-0 flex-1 rounded-r-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-400 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                />
                            </div>
                        </div>

                        <!-- Description -->

                        <div>
                            <div
                                class="mb-2 flex items-center justify-between"
                            >
                                <label
                                    class="block text-sm font-medium text-slate-300"
                                >
                                    Description
                                    <span class="text-red-400">
                                        *
                                    </span>
                                </label>

                                <span
                                    class="text-[11px] text-slate-600"
                                >
                                    {{
                                        form.description.length
                                    }}
                                    characters
                                </span>
                            </div>

                            <textarea
                                v-model="form.description"
                                rows="6"
                                placeholder="Write a clear description about this event..."
                                class="w-full resize-none rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                :class="{
                                    'border-red-500/50':
                                        errors.description,
                                }"
                            ></textarea>

                            <p
                                v-if="errors.description"
                                class="mt-1.5 text-xs text-red-400"
                            >
                                {{ errors.description }}
                            </p>
                        </div>

                    </div>
                </section>

                <!-- =================================================
                     EVENT DETAILS
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3"
                >

                    <div
                        class="border-b border-white/10 px-5 py-4 sm:px-6"
                    >
                        <div
                            class="flex items-center gap-3"
                        >
                            <div
                                class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                            >
                                <CalendarDays
                                    :size="18"
                                />
                            </div>

                            <div>
                                <h2
                                    class="text-sm font-semibold text-white"
                                >
                                    Event Details
                                </h2>

                                <p
                                    class="mt-0.5 text-xs text-slate-600"
                                >
                                    Date, time and location.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6"
                    >

                        <!-- Date -->

                        <div>
                            <label
                                class="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Event Date
                                <span class="text-red-400">
                                    *
                                </span>
                            </label>

                            <div class="relative">
                                <CalendarDays
                                    :size="17"
                                    class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                                />

                                <input
                                    v-model="form.event_date"
                                    type="date"
                                    class="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                    :class="{
                                        'border-red-500/50':
                                            errors.event_date,
                                    }"
                                />
                            </div>

                            <p
                                v-if="errors.event_date"
                                class="mt-1.5 text-xs text-red-400"
                            >
                                {{ errors.event_date }}
                            </p>
                        </div>

                        <!-- Time -->

                        <div>
                            <label
                                class="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Event Time
                                <span class="text-red-400">
                                    *
                                </span>
                            </label>

                            <div class="relative">
                                <Clock3
                                    :size="17"
                                    class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                                />

                                <input
                                    v-model="form.event_time"
                                    type="time"
                                    class="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                    :class="{
                                        'border-red-500/50':
                                            errors.event_time,
                                    }"
                                />
                            </div>

                            <p
                                v-if="errors.event_time"
                                class="mt-1.5 text-xs text-red-400"
                            >
                                {{ errors.event_time }}
                            </p>
                        </div>

                        <!-- Duration -->

                        <div>
                            <label
                                class="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Duration
                            </label>

                            <input
                                v-model="form.duration"
                                type="text"
                                placeholder="দিনব্যাপী / ৩ ঘণ্টা"
                                class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                            />
                        </div>

                        <!-- Location -->

                        <div>
                            <label
                                class="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Location
                                <span class="text-red-400">
                                    *
                                </span>
                            </label>

                            <div class="relative">
                                <MapPin
                                    :size="17"
                                    class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                                />

                                <input
                                    v-model="form.location"
                                    type="text"
                                    placeholder="বিদ্যালয় প্রাঙ্গণ"
                                    class="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                    :class="{
                                        'border-red-500/50':
                                            errors.location,
                                    }"
                                />
                            </div>

                            <p
                                v-if="errors.location"
                                class="mt-1.5 text-xs text-red-400"
                            >
                                {{ errors.location }}
                            </p>
                        </div>

                    </div>
                </section>

                <!-- =================================================
                     HIGHLIGHTS
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3"
                >

                    <div
                        class="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6"
                    >
                        <div
                            class="flex items-center gap-3"
                        >
                            <div
                                class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
                            >
                                <CheckCircle2
                                    :size="18"
                                />
                            </div>

                            <div>
                                <h2
                                    class="text-sm font-semibold text-white"
                                >
                                    Event Highlights
                                </h2>

                                <p
                                    class="mt-0.5 text-xs text-slate-600"
                                >
                                    Important points about
                                    the event.
                                </p>
                            </div>
                        </div>

                        <span
                            class="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400"
                        >
                            {{ form.highlights.length }}
                        </span>
                    </div>

                    <div class="p-5 sm:p-6">

                        <div
                            class="flex flex-col gap-2 sm:flex-row"
                        >
                            <input
                                v-model="highlightInput"
                                type="text"
                                placeholder="Add event highlight..."
                                class="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                @keyup.enter.prevent="
                                    addHighlight
                                "
                            />

                            <button
                                type="button"
                                class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
                                @click="addHighlight"
                            >
                                <Plus :size="16" />

                                Add
                            </button>
                        </div>

                        <div
                            v-if="form.highlights.length"
                            class="mt-4 space-y-2"
                        >
                            <div
                                v-for="(
                                    highlight, index
                                ) in form.highlights"
                                :key="index"
                                class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-4 py-3"
                            >
                                <div
                                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
                                >
                                    {{ index + 1 }}
                                </div>

                                <span
                                    class="min-w-0 flex-1 text-sm text-slate-300"
                                >
                                    {{ highlight }}
                                </span>

                                <button
                                    type="button"
                                    class="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                                    @click="
                                        removeHighlight(
                                            index,
                                        )
                                    "
                                >
                                    <Trash2
                                        :size="15"
                                    />
                                </button>
                            </div>
                        </div>

                        <div
                            v-else
                            class="mt-4 rounded-xl border border-dashed border-white/10 px-4 py-8 text-center"
                        >
                            <p
                                class="text-xs text-slate-600"
                            >
                                No highlights added yet.
                            </p>
                        </div>

                    </div>
                </section>

                <!-- =================================================
                     SCHEDULE
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3"
                >

                    <div
                        class="border-b border-white/10 px-5 py-4 sm:px-6"
                    >
                        <div
                            class="flex items-center gap-3"
                        >
                            <div
                                class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400"
                            >
                                <ListChecks
                                    :size="18"
                                />
                            </div>

                            <div>
                                <h2
                                    class="text-sm font-semibold text-white"
                                >
                                    Event Schedule
                                </h2>

                                <p
                                    class="mt-0.5 text-xs text-slate-600"
                                >
                                    Add activities and
                                    schedules.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="p-5 sm:p-6">

                        <div
                            class="rounded-xl border border-white/10 bg-slate-950/30 p-4"
                        >

                            <div
                                class="grid grid-cols-1 gap-3 md:grid-cols-3"
                            >

                                <input
                                    v-model="
                                        scheduleForm.time
                                    "
                                    type="text"
                                    placeholder="09:00 - 10:00"
                                    class="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                />

                                <input
                                    v-model="
                                        scheduleForm.title
                                    "
                                    type="text"
                                    placeholder="Activity title"
                                    class="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                                />

                                <button
                                    type="button"
                                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
                                    @click="addSchedule"
                                >
                                    <Plus :size="16" />

                                    Add Schedule
                                </button>

                            </div>

                            <input
                                v-model="
                                    scheduleForm.description
                                "
                                type="text"
                                placeholder="Short description..."
                                class="mt-3 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                            />

                        </div>

                        <div
                            v-if="form.schedule.length"
                            class="mt-4 space-y-2"
                        >
                            <div
                                v-for="(
                                    item, index
                                ) in form.schedule"
                                :key="index"
                                class="flex items-start gap-4 rounded-xl border border-white/5 bg-white/3 p-4"
                            >

                                <span
                                    class="shrink-0 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-400"
                                >
                                    {{ item.time }}
                                </span>

                                <div class="min-w-0 flex-1">
                                    <p
                                        class="text-sm font-semibold text-white"
                                    >
                                        {{ item.title }}
                                    </p>

                                    <p
                                        v-if="
                                            item.description
                                        "
                                        class="mt-1 text-xs leading-5 text-slate-500"
                                    >
                                        {{
                                            item.description
                                        }}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    class="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                                    @click="
                                        removeSchedule(
                                            index,
                                        )
                                    "
                                >
                                    <Trash2
                                        :size="15"
                                    />
                                </button>

                            </div>
                        </div>

                        <div
                            v-else
                            class="mt-4 rounded-xl border border-dashed border-white/10 px-4 py-8 text-center"
                        >
                            <p
                                class="text-xs text-slate-600"
                            >
                                No schedule added yet.
                            </p>
                        </div>

                    </div>
                </section>

            </div>

            <!-- =====================================================
                 SIDEBAR
            ====================================================== -->

            <div class="space-y-6">

                <!-- =================================================
                     IMAGE
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3 p-5"
                >

                    <div class="mb-4">
                        <h2
                            class="text-sm font-semibold text-white"
                        >
                            Event Image
                        </h2>

                        <p
                            class="mt-1 text-xs text-slate-600"
                        >
                            Upload a cover image for the
                            event.
                        </p>
                    </div>

                    <input
                        ref="imageInput"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handleImageUpload"
                    />

                    <!-- Image Preview -->

                    <div
                        v-if="imagePreview"
                        class="relative overflow-hidden rounded-xl border border-white/10"
                    >
                        <img
                            :src="imagePreview"
                            alt="Event image"
                            class="h-56 w-full object-cover"
                        />

                        <button
                            type="button"
                            class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-white backdrop-blur transition hover:bg-red-500"
                            @click="removeImage"
                        >
                            <X :size="16" />
                        </button>
                    </div>

                    <!-- Upload -->

                    <button
                        v-else
                        type="button"
                        class="flex h-56 w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-950/30 text-slate-600 transition hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-400"
                        @click="openImagePicker"
                    >
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5"
                        >
                            <ImagePlus :size="23" />
                        </div>

                        <p
                            class="mt-3 text-sm font-medium"
                        >
                            Upload Event Image
                        </p>

                        <p
                            class="mt-1 text-[11px] text-slate-700"
                        >
                            JPG, PNG · Maximum 5MB
                        </p>
                    </button>

                    <button
                        v-if="imagePreview"
                        type="button"
                        class="mt-3 w-full rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-white/8 hover:text-white"
                        @click="openImagePicker"
                    >
                        Change Image
                    </button>

                </section>

                <!-- =================================================
                     PUBLISH SETTINGS
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3 p-5"
                >

                    <div class="mb-5">
                        <h2
                            class="text-sm font-semibold text-white"
                        >
                            Publish Settings
                        </h2>

                        <p
                            class="mt-1 text-xs text-slate-600"
                        >
                            Control event status and
                            registration.
                        </p>
                    </div>

                    <!-- Status -->

                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Status
                        </label>

                        <select
                            v-model="form.status"
                            class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                        >
                            <option value="upcoming">
                                Upcoming
                            </option>

                            <option value="completed">
                                Completed
                            </option>
                        </select>
                    </div>

                    <!-- Registration -->

                    <div
                        class="mt-5 rounded-xl border border-white/10 bg-slate-950/30 p-4"
                    >
                        <div
                            class="flex items-center justify-between gap-4"
                        >

                            <div>
                                <p
                                    class="text-sm font-medium text-white"
                                >
                                    Registration
                                </p>

                                <p
                                    class="mt-1 text-xs leading-5 text-slate-600"
                                >
                                    Allow alumni to register.
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                :aria-checked="
                                    form.registration_open
                                "
                                class="relative h-6 w-11 shrink-0 rounded-full transition"
                                :class="
                                    form.registration_open
                                        ? 'bg-blue-500'
                                        : 'bg-slate-700'
                                "
                                @click="
                                    form.registration_open =
                                        !form.registration_open
                                "
                            >
                                <span
                                    class="absolute top-1 h-4 w-4 rounded-full bg-white transition"
                                    :class="
                                        form.registration_open
                                            ? 'left-6'
                                            : 'left-1'
                                    "
                                ></span>
                            </button>

                        </div>

                        <div class="mt-3">

                            <span
                                v-if="
                                    form.registration_open
                                "
                                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400"
                            >
                                <CheckCircle2
                                    :size="13"
                                />

                                Registration Open
                            </span>

                            <span
                                v-else
                                class="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-2.5 py-1 text-[11px] font-medium text-slate-400"
                            >
                                Registration Closed
                            </span>

                        </div>
                    </div>

                </section>

                <!-- =================================================
                     ORGANIZER
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3 p-5"
                >

                    <div class="mb-4">
                        <h2
                            class="text-sm font-semibold text-white"
                        >
                            Organizer
                        </h2>
                    </div>

                    <div class="relative">

                        <UserRound
                            :size="17"
                            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                        />

                        <input
                            v-model="form.organizer"
                            type="text"
                            placeholder="Alumni Forum"
                            class="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                            :class="{
                                'border-red-500/50':
                                    errors.organizer,
                            }"
                        />

                    </div>

                    <p
                        v-if="errors.organizer"
                        class="mt-1.5 text-xs text-red-400"
                    >
                        {{ errors.organizer }}
                    </p>

                </section>

                <!-- =================================================
                     ACTIONS
                ================================================== -->

                <section
                    class="rounded-2xl border border-white/10 bg-white/3 p-4"
                >

                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Save :size="16" />

                        {{
                            isSubmitting
                                ? "Creating..."
                                : "Create Event"
                        }}
                    </button>

                    <button
                        type="button"
                        class="mt-2 w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                        @click="cancelCreate"
                    >
                        Cancel
                    </button>

                </section>

            </div>
        </form>

        <!-- =========================================================
             PREVIEW MODAL
        ========================================================== -->

        <Teleport to="body">

            <div
                v-if="showPreview"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
                @click.self="
                    showPreview = false
                "
            >

                <div
                    class="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
                >

                    <!-- Modal Header -->

                    <div
                        class="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900 px-5 py-4"
                    >

                        <div>
                            <h2
                                class="text-sm font-semibold text-white"
                            >
                                Event Preview
                            </h2>

                            <p
                                class="mt-0.5 text-xs text-slate-600"
                            >
                                Preview before creating
                                the event.
                            </p>
                        </div>

                        <button
                            type="button"
                            class="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                            @click="
                                showPreview = false
                            "
                        >
                            <X :size="18" />
                        </button>

                    </div>

                    <!-- Modal Body -->

                    <div class="p-5 sm:p-6">

                        <!-- Image -->

                        <div
                            v-if="previewEvent.image"
                            class="overflow-hidden rounded-2xl"
                        >
                            <img
                                :src="previewEvent.image"
                                :alt="
                                    previewEvent.title
                                "
                                class="h-64 w-full object-cover sm:h-80"
                            />
                        </div>

                        <!-- Title -->

                        <div class="mt-6">

                            <div
                                class="flex flex-wrap gap-2"
                            >

                                <span
                                    class="rounded-full px-2.5 py-1 text-[11px] font-medium"
                                    :class="
                                        previewEvent.status ===
                                        'upcoming'
                                            ? 'bg-blue-500/10 text-blue-400'
                                            : 'bg-slate-500/10 text-slate-400'
                                    "
                                >
                                    {{
                                        statusLabel(
                                            previewEvent.status,
                                        )
                                    }}
                                </span>

                                <span
                                    v-if="
                                        previewEvent.registration_open
                                    "
                                    class="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400"
                                >
                                    Registration Open
                                </span>

                            </div>

                            <h1
                                class="mt-3 text-2xl font-bold text-white sm:text-3xl"
                            >
                                {{
                                    previewEvent.title ||
                                    "Event Title"
                                }}
                            </h1>

                            <p
                                class="mt-3 text-sm leading-7 text-slate-400"
                            >
                                {{
                                    previewEvent.description ||
                                    "Event description will appear here."
                                }}
                            </p>

                        </div>

                        <!-- Meta -->

                        <div
                            class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                        >

                            <div
                                class="rounded-xl border border-white/10 bg-white/3 p-4"
                            >
                                <div
                                    class="flex items-center gap-2 text-blue-400"
                                >
                                    <CalendarDays
                                        :size="16"
                                    />

                                    <span
                                        class="text-xs font-medium"
                                    >
                                        Date
                                    </span>
                                </div>

                                <p
                                    class="mt-2 text-sm text-white"
                                >
                                    {{
                                        formatDate(
                                            previewEvent.event_date,
                                        )
                                    }}
                                </p>
                            </div>

                            <div
                                class="rounded-xl border border-white/10 bg-white/3 p-4"
                            >
                                <div
                                    class="flex items-center gap-2 text-cyan-400"
                                >
                                    <Clock3 :size="16" />

                                    <span
                                        class="text-xs font-medium"
                                    >
                                        Time
                                    </span>
                                </div>

                                <p
                                    class="mt-2 text-sm text-white"
                                >
                                    {{
                                        formatTime(
                                            previewEvent.event_time,
                                        )
                                    }}
                                </p>
                            </div>

                            <div
                                class="rounded-xl border border-white/10 bg-white/3 p-4"
                            >
                                <div
                                    class="flex items-center gap-2 text-emerald-400"
                                >
                                    <MapPin :size="16" />

                                    <span
                                        class="text-xs font-medium"
                                    >
                                        Location
                                    </span>
                                </div>

                                <p
                                    class="mt-2 text-sm text-white"
                                >
                                    {{
                                        previewEvent.location ||
                                        "—"
                                    }}
                                </p>
                            </div>

                            <div
                                class="rounded-xl border border-white/10 bg-white/3 p-4"
                            >
                                <div
                                    class="flex items-center gap-2 text-violet-400"
                                >
                                    <UserRound
                                        :size="16"
                                    />

                                    <span
                                        class="text-xs font-medium"
                                    >
                                        Organizer
                                    </span>
                                </div>

                                <p
                                    class="mt-2 text-sm text-white"
                                >
                                    {{
                                        previewEvent.organizer ||
                                        "—"
                                    }}
                                </p>
                            </div>

                        </div>

                        <!-- Highlights -->

                        <div
                            v-if="
                                previewEvent.highlights
                                    .length
                            "
                            class="mt-7"
                        >

                            <h3
                                class="text-sm font-semibold text-white"
                            >
                                Highlights
                            </h3>

                            <div
                                class="mt-3 space-y-2"
                            >

                                <div
                                    v-for="(
                                        highlight,
                                        index
                                    ) in previewEvent.highlights"
                                    :key="index"
                                    class="flex items-start gap-2 text-sm text-slate-400"
                                >
                                    <CheckCircle2
                                        :size="15"
                                        class="mt-0.5 shrink-0 text-blue-400"
                                    />

                                    {{ highlight }}
                                </div>

                            </div>

                        </div>

                        <!-- Schedule -->

                        <div
                            v-if="
                                previewEvent.schedule
                                    .length
                            "
                            class="mt-7"
                        >

                            <h3
                                class="text-sm font-semibold text-white"
                            >
                                Schedule
                            </h3>

                            <div
                                class="mt-3 space-y-2"
                            >

                                <div
                                    v-for="(
                                        item, index
                                    ) in previewEvent.schedule"
                                    :key="index"
                                    class="flex items-start gap-4 rounded-xl border border-white/5 bg-white/3 p-4"
                                >

                                    <span
                                        class="shrink-0 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-400"
                                    >
                                        {{ item.time }}
                                    </span>

                                    <div>
                                        <p
                                            class="text-sm font-medium text-white"
                                        >
                                            {{ item.title }}
                                        </p>

                                        <p
                                            v-if="
                                                item.description
                                            "
                                            class="mt-1 text-xs leading-5 text-slate-500"
                                        >
                                            {{
                                                item.description
                                            }}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Teleport>

    </div>
</template>