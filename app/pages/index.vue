<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-default flex flex-col justify-center items-center">
		<LandingHeroBackground/>
        <UContainer>
			<UPageHero
				title="nuxt4-ui4-hub-betterauth-template"
				description="A Nuxt v4 + Nuxt UI v4 + Nuxt Hub v0.10 + BetterAuth Template"
			/>
			<UPageGrid>
				<UPageCard
					spotlight
					title="CSRF Protection"
					description="Double-submit cookie pattern for secure state-changing requests"
				/>
				<UPageCard
					spotlight
					title="Session Security"
					description="Token rotation and fixation prevention"
				/>
				<UPageCard
					spotlight
					title="Security Headers"
					description="CSP, HSTS, X-Frame-Options, and more"
				/>
				<UPageCard
					spotlight
					title="Input Sanitization"
					description="Email normalization and username sanitization"
				/>
				<UPageCard
					spotlight
					title="Authorization"
					description="Role-based access control with strict equality"
				/>
				<UPageCard
					spotlight
					title="Encrypted Sessions"
					description="Sealed cookie sessions with better-auth"
				/>
			</UPageGrid>
		</UContainer>
    </div>
</template>
