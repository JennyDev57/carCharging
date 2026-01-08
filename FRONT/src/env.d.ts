 /// <reference path="../.astro/types.d.ts" />

declare namespace App {
    interface Locals {
        user: typeof import('./lib/auth-client').$Infer.Session.user | null
        user: typeof import('./lib/auth-client').$Infer.Session.session | null
    }
}