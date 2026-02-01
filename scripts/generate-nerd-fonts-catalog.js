#!/usr/bin/env node
/**
 * Nerd Fonts Catalog Generator
 * Generates a comprehensive JSON catalog of all Nerd Fonts with CDN URLs
 */

const fonts = [
	// Programming fonts with ligatures
	{
		id: "jetbrains-mono-nerd",
		name: "JetBrainsMono Nerd Font",
		shortName: "JetBrainsMono",
		category: "programming",
		version: "2.304",
		description:
			"JetBrains officially created font for developers with excellent ligatures and readability",
		features: ["ligatures", "jetbrains", "professional"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: "JetBrains Mono",
		googleFontsWeights: "100..800",
		homebrewName: "font-jetbrains-mono-nerd-font",
	},
	{
		id: "fira-code-nerd",
		name: "FiraCode Nerd Font",
		shortName: "FiraCode",
		category: "programming",
		version: "6.2",
		description:
			"Programming ligatures, extension of Fira Mono font, enlarged operators - very popular choice",
		features: ["ligatures", "popular", "mozilla"],
		weights: [300, 400, 450, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: "Fira Code",
		googleFontsWeights: "300..700",
		homebrewName: "font-fira-code-nerd-font",
	},
	{
		id: "hack-nerd",
		name: "Hack Nerd Font",
		shortName: "Hack",
		category: "programming",
		version: "3.003",
		description:
			"Dotted zero, short descenders, expands upon work done for Bitstream Vera & DejaVu, legible at common sizes",
		features: ["dotted-zero", "legible", "bitstream-based"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-hack-nerd-font",
	},
	{
		id: "caskaydia-cove-nerd",
		name: "CaskaydiaCove Nerd Font",
		shortName: "CaskaydiaCove",
		category: "programming",
		version: "2407.24",
		description:
			"Microsoft's Cascadia Code with Nerd Font glyphs - includes programming ligatures, designed for Windows Terminal",
		features: ["ligatures", "microsoft", "windows-terminal"],
		weights: [200, 300, 400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-caskaydia-cove-nerd-font",
	},
	{
		id: "caskaydia-mono-nerd",
		name: "CaskaydiaMono Nerd Font",
		shortName: "CaskaydiaMono",
		category: "programming",
		version: "2407.24",
		description:
			"Like Cascadia Code but without any ligatures - for those who prefer no ligatures",
		features: ["no-ligatures", "microsoft"],
		weights: [200, 300, 400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-caskaydia-mono-nerd-font",
	},

	// Dense/compact fonts
	{
		id: "iosevka-nerd",
		name: "Iosevka Nerd Font",
		shortName: "Iosevka",
		category: "dense",
		version: "33.2.1",
		description:
			"Narrow and horizontally tight characters, slashed zero. Maximum information density.",
		features: ["narrow", "dense", "tall"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-iosevka-nerd-font",
	},
	{
		id: "iosevka-term-nerd",
		name: "IosevkaTerm Nerd Font",
		shortName: "IosevkaTerm",
		category: "dense",
		version: "33.2.1",
		description:
			"A narrower variant focusing on terminal uses - arrows and geometric symbols are narrow",
		features: ["narrow", "terminal-optimized"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-iosevka-term-nerd-font",
	},
	{
		id: "iosevka-term-slab-nerd",
		name: "IosevkaTermSlab Nerd Font",
		shortName: "IosevkaTermSlab",
		category: "dense",
		version: "33.2.1",
		description:
			"Nice as Iosevka but with slab serifs for a different aesthetic",
		features: ["narrow", "slab-serif"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-iosevka-term-slab-nerd-font",
	},

	// Terminal classics
	{
		id: "meslo-lg-nerd",
		name: "MesloLG Nerd Font",
		shortName: "MesloLG",
		category: "terminal",
		version: "1.21",
		description:
			"Slashed zeros, customized version of Apple's Menlo - popular terminal font",
		features: ["powerline", "menlo-based", "popular"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-meslo-lg-nerd-font",
	},
	{
		id: "terminus-nerd",
		name: "Terminess Nerd Font",
		shortName: "Terminess",
		category: "terminal",
		version: "4.49.2",
		description:
			"Squarish characters that are slightly askew - bitmap font aesthetic in TTF",
		features: ["bitmap-like", "square", "retro"],
		weights: [400, 700],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-terminus-nerd-font",
	},
	{
		id: "gohu-nerd",
		name: "Gohu Nerd Font",
		shortName: "Gohu",
		category: "terminal",
		version: "2.0",
		description:
			"Bitmap font, tall capitals and ascenders, small serifs - distinctive look",
		features: ["bitmap", "tall", "serifs"],
		weights: [400, 700],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-gohu-nerd-font",
	},

	// Google Fonts available
	{
		id: "geist-mono-nerd",
		name: "GeistMono Nerd Font",
		shortName: "GeistMono",
		category: "minimal",
		version: "1.401",
		description:
			"Vercel's monospaced typeface designed for code editors, diagrams, terminals - very clean",
		features: ["vercel", "clean", "modern"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		npmPackage: "geist",
		homebrewName: "font-geist-mono-nerd-font",
	},
	{
		id: "space-mono-nerd",
		name: "SpaceMono Nerd Font",
		shortName: "SpaceMono",
		category: "creative",
		version: "1.001",
		description:
			"Squarish character lines, dotted zero, aggressive parentheses - Google Fonts",
		features: ["google", "square", "distinctive"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: "Space Mono",
		googleFontsWeights: "400;700",
		homebrewName: "font-space-mono-nerd-font",
	},
	{
		id: "roboto-mono-nerd",
		name: "RobotoMono Nerd Font",
		shortName: "RobotoMono",
		category: "minimal",
		version: "3.0",
		description:
			"Dashed zero, curved and straight character lines - Google's Roboto Mono",
		features: ["google", "roboto", "clean"],
		weights: [100, 200, 300, 400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: "Roboto Mono",
		googleFontsWeights: "100..700",
		homebrewName: "font-roboto-mono-nerd-font",
	},
	{
		id: "inconsolata-nerd",
		name: "Inconsolata Nerd Font",
		shortName: "Inconsolata",
		category: "programming",
		version: "3.000",
		description:
			"Slashed zero, takes inspiration from many different fonts - very popular on Google Fonts",
		features: ["google", "popular", "classic"],
		weights: [200, 300, 400, 500, 600, 700, 800, 900],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: "Inconsolata",
		googleFontsWeights: "200..900",
		homebrewName: "font-inconsolata-nerd-font",
	},
	{
		id: "ubuntu-mono-nerd",
		name: "UbuntuMono Nerd Font",
		shortName: "UbuntuMono",
		category: "terminal",
		version: "0.80",
		description:
			"Dotted zeros, used the n, o, H & O Latin characters as a base for design - Ubuntu's monospace",
		features: ["ubuntu", "linux", "canonical"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: "Ubuntu Mono",
		googleFontsWeights: "400;700",
		homebrewName: "font-ubuntu-mono-nerd-font",
	},
	{
		id: "source-code-pro-nerd",
		name: "SauceCodePro Nerd Font",
		shortName: "SauceCodePro",
		originalName: "Source Code Pro",
		category: "programming",
		version: "2.042",
		description:
			"Monospaced font family for user interface and coding environments - Adobe's Source Code Pro",
		features: ["adobe", "professional", "adobe-fonts"],
		weights: [200, 300, 400, 500, 600, 700, 900],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: "Source Code Pro",
		googleFontsWeights: "200..900",
		homebrewName: "font-sauce-code-pro-nerd-font",
	},

	// Creative/unique fonts
	{
		id: "victor-mono-nerd",
		name: "VictorMono Nerd Font",
		shortName: "VictorMono",
		category: "creative",
		version: "1.5.6",
		description:
			"Clean, crisp and narrow, with a large x-height and clear punctuation. Cursive italics are distinctive.",
		features: ["cursive-italics", "narrow", "elegant"],
		weights: [100, 200, 300, 400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-victor-mono-nerd-font",
	},
	{
		id: "fantasque-sans-mono-nerd",
		name: "FantasqueSansMono Nerd Font",
		shortName: "FantasqueSansMono",
		category: "creative",
		version: "1.8.0",
		description:
			"Wibbly-wobbly handwriting-like fuzziness, takes inspiration from Inconsolata and Monaco",
		features: ["handwritten", "fun", "fuzzy"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-fantasque-sans-mono-nerd-font",
	},
	{
		id: "agave-nerd",
		name: "Agave Nerd Font",
		shortName: "Agave",
		category: "creative",
		version: "37",
		description:
			"A small, monospace, outline font that is geometrically regular and simple with a unique artistic feel",
		features: ["artistic", "geometric", "small"],
		weights: [400, 700],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-agave-nerd-font",
	},
	{
		id: "comic-shanns-mono-nerd",
		name: "ComicShannsMono Nerd Font",
		shortName: "ComicShannsMono",
		category: "creative",
		version: "1.3.2",
		description:
			"The very typeface you've been trained to recognize since childhood - comic style monospace",
		features: ["comic", "fun", "playful"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-comic-shanns-mono-nerd-font",
	},

	// Minimal/clean
	{
		id: "commit-mono-nerd",
		name: "CommitMono Nerd Font",
		shortName: "CommitMono",
		category: "minimal",
		version: "1.143",
		description:
			"An anonymous and neutral programming typeface, highly readable",
		features: ["neutral", "readable", "modern"],
		weights: [200, 300, 400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-commit-mono-nerd-font",
	},
	{
		id: "blex-mono-nerd",
		name: "BlexMono Nerd Font",
		shortName: "BlexMono",
		originalName: "IBM Plex Mono",
		category: "minimal",
		version: "2.004",
		description:
			"It's global, it's versatile and it's distinctly IBM. Corporate and professional.",
		features: ["ibm", "corporate", "professional"],
		weights: [100, 200, 300, 400, 450, 500, 600, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: "IBM Plex Mono",
		googleFontsWeights: "100..700",
		homebrewName: "font-blex-mono-nerd-font",
	},
	{
		id: "intel-one-mono-nerd",
		name: "IntelOneMono Nerd Font",
		shortName: "IntelOneMono",
		category: "minimal",
		version: "1.4.0",
		description:
			"Expressive monospaced font family built with clarity, legibility, and developer needs in mind",
		features: ["intel", "clear", "legible"],
		weights: [100, 200, 300, 400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-intel-one-mono-nerd-font",
	},
	{
		id: "monaspace-nerd",
		name: "Monaspice Nerd Font",
		shortName: "Monaspice",
		originalName: "Monaspace",
		category: "programming",
		version: "1.200",
		description:
			"Five matching fonts all having 'texture healing' to improve legibility - GitHub's font family",
		features: ["github", "texture-healing", "five-variants"],
		weights: [200, 300, 400, 500, 600, 700, 800],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-monaspace-nerd-font",
	},

	// Accessibility
	{
		id: "atkinson-hyperlegible-mono-nerd",
		name: "Atkinson Hyperlegible Mono Nerd Font",
		shortName: "AtkynsonMono",
		category: "accessible",
		version: "2.001",
		description:
			"A monospaced font designed to improve legibility and readability for individuals with low vision",
		features: ["accessibility", "low-vision", "legibility"],
		weights: [400, 700],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-atkinson-hyperlegible-mono-nerd-font",
	},
	{
		id: "opendyslexic-nerd",
		name: "OpenDyslexic Nerd Font",
		shortName: "OpenDyslexic",
		category: "accessible",
		version: "2.001",
		description:
			"Designed specifically to alleviate reading errors caused by dyslexia - weighted bottoms for stability",
		features: ["dyslexia", "accessibility", "weighted"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-opendyslexic-nerd-font",
	},

	// Retro/nostalgic
	{
		id: "3270-nerd",
		name: "3270 Nerd Font",
		shortName: "3270",
		category: "retro",
		version: "3.0.1",
		description:
			"Derived from the x3270 font, a modern format of a font with high nostalgic IBM terminal value",
		features: ["ibm", "terminal", "retro", "ibm-3270"],
		weights: [400, 700],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-3270-nerd-font",
	},
	{
		id: "bigblue-terminal-nerd",
		name: "BigBlueTerminal Nerd Font",
		shortName: "BigBlueTerminal",
		category: "retro",
		version: null,
		description: "Nostalgic, closely based on IBM's 8x14 EGA/VGA charset",
		features: ["ibm", "ega", "vga", "retro"],
		weights: [400],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-bigblue-terminal-nerd-font",
	},
	{
		id: "proggy-clean-nerd",
		name: "ProggyClean Nerd Font",
		shortName: "ProggyClean",
		category: "dense",
		version: "2004/04/15",
		description:
			"Designed particularly for use at small point sizes - bitmap-like clarity",
		features: ["small-sizes", "bitmap-like", "crisp"],
		weights: [400],
		hasItalic: false,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-proggy-clean-nerd-font",
	},

	// Additional programming fonts
	{
		id: "hasklug-nerd",
		name: "Hasklug Nerd Font",
		shortName: "Hasklug",
		originalName: "Hasklig",
		category: "programming",
		version: "1.2",
		description:
			"Monospaced ligatures make composite glyphs (e.g. ->) more readable, especially in Haskell",
		features: ["ligatures", "haskell", "functional"],
		weights: [400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-hasklug-nerd-font",
	},
	{
		id: "lilex-nerd",
		name: "Lilex Nerd Font",
		shortName: "Lilex",
		category: "programming",
		version: "2.600",
		description: "Modern with ligatures and a distinctive geometric design",
		features: ["ligatures", "modern", "geometric"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-lilex-nerd-font",
	},
	{
		id: "zed-mono-nerd",
		name: "ZedMono Nerd Font",
		shortName: "ZedMono",
		category: "programming",
		version: "1.2.0",
		description:
			"Zed Mono is a more rounded version of Iosevka - from Zed editor creators",
		features: ["zed", "rounded", "modern"],
		weights: [400, 500, 600, 700],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: null,
		homebrewName: "font-zed-mono-nerd-font",
	},
	{
		id: "martian-mono-nerd",
		name: "MartianMono Nerd Font",
		shortName: "MartianMono",
		category: "programming",
		version: "1.1.0",
		description:
			"Free and open-source monospaced font from Evil Martians - great for UI",
		features: ["evil-martians", "ui", "modern"],
		weights: [100, 200, 300, 400, 500, 600, 700, 800],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-martian-mono-nerd-font",
	},
	{
		id: "recursive-mono-nerd",
		name: "RecMono Nerd Font",
		shortName: "RecMono",
		originalName: "Recursive Mono",
		category: "creative",
		version: "1.085",
		description:
			"Inspired by casual script signpainting, 4 variants with linear, casual, mono styles",
		features: ["variable", "signpainting", "casual"],
		weights: [300, 400, 500, 600, 700, 800, 900, 1000],
		hasItalic: true,
		hasLigatures: true,
		googleFontsName: "Recursive",
		googleFontsWeights: "300..1000",
		homebrewName: "font-recursive-mono-nerd-font",
	},

	// Classic fonts
	{
		id: "dejavu-sans-mono-nerd",
		name: "DejaVuSansMono Nerd Font",
		shortName: "DejaVuSansMono",
		category: "programming",
		version: "2.37",
		description:
			"Dotted zero, based on the Bitstream Vera Fonts with a wider range of characters",
		features: ["classic", "wide-coverage", "bitstream-based"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-dejavu-sans-mono-nerd-font",
	},
	{
		id: "liberation-mono-nerd",
		name: "LiberationMono Nerd Font",
		shortName: "LiberationMono",
		category: "programming",
		version: "2.1.5",
		description:
			"0 and O very similar, very short tight descenders - metrically compatible with Courier New",
		features: ["metric-compatible", "courier-alternative"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-liberation-mono-nerd-font",
	},
	{
		id: "envy-code-r-nerd",
		name: "EnvyCodeR Nerd Font",
		shortName: "EnvyCodeR",
		category: "programming",
		version: "0.79",
		description:
			"Fully-scalable monospaced font designed for programming and command prompts",
		features: ["programming", "command-prompt"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-envy-code-r-nerd-font",
	},
	{
		id: "hermit-nerd",
		name: "Hermit Nerd Font",
		shortName: "Hermit",
		category: "programming",
		version: "2.0",
		description: "Symbols stand out from common text - clear and distinctive",
		features: ["distinctive", "clear"],
		weights: [400, 700],
		hasItalic: true,
		hasLigatures: false,
		googleFontsName: null,
		homebrewName: "font-hermit-nerd-font",
	},
];

// Generate Google Fonts import URL
function generateGoogleFontsImport(font) {
	if (!font.googleFontsName) return null;
	const family = encodeURIComponent(font.googleFontsName);
	const weights = font.googleFontsWeights || "400";
	return `https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap`;
}

// Generate Google Fonts CSS @import
function generateGoogleFontsCssImport(font) {
	if (!font.googleFontsName) return null;
	const family = encodeURIComponent(font.googleFontsName);
	const weights = font.googleFontsWeights || "400";
	return `@import url('https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap');`;
}

// Generate jsDelivr CDN URL
function generateJsDelivrUrl(font) {
	const dirName = font.id.replace(/-nerd$/, "").replace(/-/g, "");
	// Map special cases
	const specialCases = {
		jetbrainsmono: "JetBrainsMono",
		firacode: "FiraCode",
		hack: "Hack",
		caskaydiacove: "CascadiaCode",
		caskaydiamono: "CascadiaMono",
		iosevka: "Iosevka",
		iosevkaterm: "IosevkaTerm",
		iosevkatermslab: "IosevkaTermSlab",
		meslolg: "Meslo",
		terminus: "Terminus",
		gohu: "Gohu",
		geistmono: "GeistMono",
		spacemono: "SpaceMono",
		robotomono: "RobotoMono",
		inconsolata: "Inconsolata",
		ubuntumono: "UbuntuMono",
		sourcecodepro: "SourceCodePro",
		victormono: "VictorMono",
		fantasquesansmono: "FantasqueSansMono",
		agave: "Agave",
		comicshannsmono: "ComicShannsMono",
		commitmono: "CommitMono",
		blexmono: "IBMPlexMono",
		intelonemono: "IntelOneMono",
		monaspice: "Monaspace",
		atkinsonhyperlegiblemono: "AtkinsonHyperlegibleMono",
		opendyslexic: "OpenDyslexic",
		bigblueterminal: "BigBlueTerminal",
		proggyclean: "ProggyClean",
		hasklug: "Hasklig",
		lilex: "Lilex",
		zedmono: "ZedMono",
		martianmono: "MartianMono",
		recursivemono: "Recursive",
		dejavusansmono: "DejaVuSansMono",
		liberationmono: "LiberationMono",
		envycoder: "EnvyCodeR",
		hermit: "Hermit",
		3270: "3270",
		"0xproto": "0xProto",
		adwaitamono: "AdwaitaMono",
	};

	const folderName =
		specialCases[dirName] || dirName.charAt(0).toUpperCase() + dirName.slice(1);
	return `https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@master/patched-fonts/${folderName}/`;
}

// Generate GitHub release URL
function generateGitHubReleaseUrl(font) {
	const zipName = font.id.replace(/-nerd$/, "").replace(/-/g, "");
	const specialCases = {
		jetbrainsmono: "JetBrainsMono",
		firacode: "FiraCode",
		caskaydiacove: "CascadiaCode",
		caskaydiamono: "CascadiaMono",
		iosevkaterm: "IosevkaTerm",
		iosevkatermslab: "IosevkaTermSlab",
		meslolg: "Meslo",
		dejavusansmono: "DejaVuSansMono",
		ubuntumono: "UbuntuMono",
		sourcecodepro: "SourceCodePro",
		victormono: "VictorMono",
		fantasquesansmono: "FantasqueSansMono",
		comicshannsmono: "ComicShannsMono",
		commitmono: "CommitMono",
		blexmono: "IBMPlexMono",
		intelonemono: "IntelOneMono",
		monaspice: "Monaspace",
		atkinsonhyperlegiblemono: "AtkinsonHyperlegibleMono",
		bigblueterminal: "BigBlueTerminal",
		proggyclean: "ProggyClean",
		hasklug: "Hasklig",
		recursivemono: "Recursive",
		liberationmono: "LiberationMono",
		envycoder: "EnvyCodeR",
		3270: "3270",
		"0xproto": "0xProto",
		spacemono: "SpaceMono",
		robotomono: "RobotoMono",
		inconsolata: "Inconsolata",
	};

	const zipFile =
		specialCases[zipName] || zipName.charAt(0).toUpperCase() + zipName.slice(1);
	return `https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/${zipFile}.zip`;
}

// Generate CSS import statement
function generateCssImport(font) {
	if (font.googleFontsName) {
		return generateGoogleFontsCssImport(font);
	}
	if (font.npmPackage) {
		return `import { ${font.shortName} } from '${font.npmPackage}/font/mono';`;
	}
	return `/* Download from: ${generateGitHubReleaseUrl(font)} */`;
}

// Generate font face declaration
function generateFontFaceDeclaration(font) {
	const fallbacks = font.id.includes("mono") ? "monospace" : "sans-serif";
	return `font-family: '${font.name}', '${font.shortName}', ${fallbacks};`;
}

// Generate Tailwind config
function generateTailwindConfig(font) {
	const fallbacks = font.id.includes("mono") ? "monospace" : "sans-serif";
	return `'${font.name}', '${font.shortName}', ${fallbacks}`;
}

// Generate install commands
function generateInstallCommands(font) {
	return {
		macos: font.homebrewName
			? `brew install --cask ${font.homebrewName}`
			: null,
		arch: `sudo pacman -S ttf-${font.id.replace(/-nerd$/, "").replace(/-/g, "")}-nerd`,
		scoop: `scoop install ${font.shortName}-NF`,
	};
}

// Build complete catalog
const catalog = {
	_meta: {
		version: "3.4.0",
		totalFonts: fonts.length,
		lastUpdated: "2026-01-31",
		source: "https://github.com/ryanoasis/nerd-fonts",
		website: "https://www.nerdfonts.com",
		description:
			"Complete Nerd Fonts collection with CDN URLs, CSS imports, and installation commands",
		glyphCount: "10,000+",
		iconSets: [
			"Seti-UI + Custom",
			"Devicons",
			"Font Awesome",
			"Font Awesome Extension",
			"Material Design Icons",
			"Weather",
			"Octicons",
			"Powerline Symbols",
			"Powerline Extra Symbols",
			"IEC Power Symbols",
			"Font Logos",
			"Pomicons",
			"Codicons",
		],
	},
	categories: {
		programming: {
			description:
				"Fonts optimized for programming with ligatures, clear distinctions, and excellent readability",
			recommendations: [
				"jetbrains-mono-nerd",
				"fira-code-nerd",
				"caskaydia-cove-nerd",
				"caskaydia-mono-nerd",
				"zed-mono-nerd",
			],
		},
		terminal: {
			description:
				"Fonts designed for terminal use with powerline symbols and compact designs",
			recommendations: [
				"iosevka-term-nerd",
				"meslo-lg-nerd",
				"terminus-nerd",
				"ubuntu-mono-nerd",
			],
		},
		dense: {
			description: "Narrow fonts for maximum information density",
			recommendations: [
				"iosevka-nerd",
				"iosevka-term-nerd",
				"proggy-clean-nerd",
				"terminus-nerd",
			],
		},
		retro: {
			description: "Vintage and nostalgic terminal fonts",
			recommendations: [
				"3270-nerd",
				"bigblue-terminal-nerd",
				"gohu-nerd",
				"terminus-nerd",
			],
		},
		creative: {
			description: "Unique and artistic monospace fonts",
			recommendations: [
				"victor-mono-nerd",
				"fantasque-sans-mono-nerd",
				"comic-shanns-mono-nerd",
				"recursive-mono-nerd",
			],
		},
		accessible: {
			description: "Fonts designed for accessibility and readability",
			recommendations: [
				"atkinson-hyperlegible-mono-nerd",
				"opendyslexic-nerd",
				"commit-mono-nerd",
			],
		},
		minimal: {
			description: "Clean, simple, and minimal designs",
			recommendations: [
				"geist-mono-nerd",
				"jetbrains-mono-nerd",
				"blex-mono-nerd",
				"commit-mono-nerd",
			],
		},
		"google-fonts": {
			description: "Fonts available on Google Fonts for easy web integration",
			recommendations: [
				"jetbrains-mono-nerd",
				"fira-code-nerd",
				"space-mono-nerd",
				"roboto-mono-nerd",
				"inconsolata-nerd",
				"ubuntu-mono-nerd",
				"source-code-pro-nerd",
			],
		},
	},
	fontPairings: {
		"modern-dev": {
			heading: "geist-mono-nerd",
			body: "geist-mono-nerd",
			code: "geist-mono-nerd",
			description: "Vercel's cohesive font system - use the Geist package",
		},
		professional: {
			heading: "jetbrains-mono-nerd",
			body: "jetbrains-mono-nerd",
			code: "jetbrains-mono-nerd",
			description: "JetBrains Mono for everything - professional and clean",
		},
		hacker: {
			heading: "fira-code-nerd",
			body: "fira-code-nerd",
			code: "fira-code-nerd",
			description: "Fira Code with ligatures - popular open source choice",
		},
		microsoft: {
			heading: "caskaydia-cove-nerd",
			body: "caskaydia-cove-nerd",
			code: "caskaydia-cove-nerd",
			description: "Cascadia Code - designed for Windows Terminal",
		},
		"dense-terminal": {
			heading: "iosevka-term-nerd",
			body: "iosevka-term-nerd",
			code: "iosevka-term-nerd",
			description: "Maximum density for terminal power users",
		},
		"classic-terminal": {
			heading: "meslo-lg-nerd",
			body: "meslo-lg-nerd",
			code: "meslo-lg-nerd",
			description: "Meslo - the classic terminal font derived from Menlo",
		},
		"creative-coding": {
			heading: "victor-mono-nerd",
			body: "victor-mono-nerd",
			code: "victor-mono-nerd",
			description: "Victor Mono with distinctive cursive italics",
		},
		"accessible-reading": {
			heading: "atkinson-hyperlegible-mono-nerd",
			body: "atkinson-hyperlegible-mono-nerd",
			code: "atkinson-hyperlegible-mono-nerd",
			description: "Maximum legibility for low vision users",
		},
	},
	fonts: {},
};

// Process each font
for (const font of fonts) {
	const jsDelivrUrl = generateJsDelivrUrl(font);
	const githubReleaseUrl = generateGitHubReleaseUrl(font);
	const googleFontsUrl = generateGoogleFontsImport(font);

	catalog.fonts[font.id] = {
		name: font.name,
		familyName: font.name,
		shortName: font.shortName,
		originalName: font.originalName || null,
		category: font.category,
		version: font.version,
		description: font.description,
		features: font.features,
		weights: font.weights,
		hasItalic: font.hasItalic,
		hasLigatures: font.hasLigatures,
		nerdFontVersion: "3.4.0",
		license: font.license || "Various",
		urls: {
			githubRelease: githubReleaseUrl,
			jsDelivr: jsDelivrUrl,
			googleFonts: googleFontsUrl,
			preview: `https://www.programmingfonts.org/#${font.shortName.toLowerCase().replace(/ /g, "-")}`,
		},
		install: {
			homebrew: font.homebrewName,
			commands: generateInstallCommands(font),
		},
		css: {
			import: generateCssImport(font),
			fontFace: generateFontFaceDeclaration(font),
			tailwindConfig: generateTailwindConfig(font),
		},
	};
}

// Output as JSON
console.log(JSON.stringify(catalog, null, 2));
