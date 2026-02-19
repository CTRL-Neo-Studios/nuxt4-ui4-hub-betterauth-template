<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-default flex flex-col justify-center items-center">
		<LandingHeroBackground/>
        <UContainer>
			<div class="text-center">
				<h1 class="text-4xl font-bold mb-4">
					Nuxt v4 + Nuxt UI v4 + Nuxt Hub v0.10 + BetterAuth
				</h1>
				<p class="text-xl text-muted mb-8">
					Secure Authentication Template with CSRF Protection
				</p>
			</div>

			<div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
				<UPageCard
					title="CSRF Protection"
					description="Double-submit cookie pattern for secure state-changing requests"
				/>
				<UPageCard
					title="Session Security"
					description="Token rotation and fixation prevention"
				/>
				<UPageCard
					title="Security Headers"
					description="CSP, HSTS, X-Frame-Options, and more"
				/>
				<UPageCard
					title="Input Sanitization"
					description="Email normalization and username sanitization"
				/>
				<UPageCard
					title="Authorization"
					description="Role-based access control with strict equality"
				/>
				<UPageCard
					title="Encrypted Sessions"
					description="Sealed cookie sessions with better-auth"
				/>
			</div>
		</UContainer>
    </div>
</template>
