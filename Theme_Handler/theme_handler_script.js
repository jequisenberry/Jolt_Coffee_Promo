const Theme_Handler = {

    /**
     * Defines theme-dependent styles for various elements in the document.
     * Each entry specifies a target element and the CSS properties that
     * should change based on the active theme mode.
     *
     */
    Theme_Styles: [
        
        // Body Containers
        {
            element:    "body",
            styles:     [
                {style: "background-color"  , value: {light: "#FFFFFF"  , dark: "#000000"}}
            ]
        },
        {
            element:    ".body-table",
            styles:     [
                {style: "background-color" , value: {light: "#FFFFFF"  , dark: "#000000"}}
            ]
        },
    
        // main Container
        {
            element: ".main-container",
            styles: [
                {
                    style: "background-color" ,
                    value: {light: "#FFFFFF"  , dark: "#111111"}
                }
            ]
        },
    
        // Header & Footer Containers
        {
            element: ".header-footer",
            styles: [
                {
                    style: "background-color" ,
                    value: {light: "#D9CCC3"  , dark: "#353a3e"}
                }
            ]
        },
        {
            element: ".header-subcontainer" ,
            styles: [
                {
                    style:  "background-color" ,
                    value:  {light: "#D9CCC3"  , dark: "#353a3e"}
                }
            ]
        },

        // Horizon Line
        {
            element: ".horizon-line",
            styles: [
                {
                    style: "background-color" ,
                    value: {light: "#501E1F"  , dark: "#353a3e"}
                }
            ]
        },

        // Text
        {
            element: "span",
            styles: [
                {
                    style: "color",
                    value: {light: "#501E1F"  , dark: "#bfbfbf"}
                }
            ]
        },
        {
            element: "strong",
            styles: [
                {
                    style: "color",
                    value: {light: "#501E1F"  , dark: "#e0e0e0"}
                }
            ]
        },
        {
            element: "a",
            styles: [
                {
                    style: "color",
                    value: {light: "#501E1F"  , dark: "#e0e0e0"}
                }
            ]
        },

        // CTA
        {
            element: ".product-cta span",
            styles: [
                {
                    style: "color",
                    value: { light: "#FFFFFF" , dark: "#FFFFFF" }
                }
            ]
        },

        // Image Switches
        {
            element: ".light-mode",
            styles: [
                { 
                    style: "display",
                    value: {light: "block"    , dark: "none"}
                },
                {
                    style: "overflow",
                    value: {light: "unset"    , dark: "none"  }
                },
                {
                    style: "width",
                    value: {light: "unset"    , dark: "0px"   }
                },
                {
                    style: "height" ,
                    value: {light: "auto"     , dark: "0px"   }
                }
            ]
        },
        {
            element: ".dark-mode",
            styles: [
                {
                    style: "display",
                    value: { light: "none"    , dark: "block" }
                },
                {
                    style: "overflow",
                    value: { light: "hidden"  , dark: "unset" }
                },
                {
                    style: "width",
                    value: { light: "0px"     , dark: "unset" }
                },
                {
                    style: "height",
                    value: { light: "0px"     , dark: "auto"  }
                }
            ]
        },
    ],

    /**
     * Stores the current state of the theme toggle.
     *
     * @property {boolean} isDarkMode - Indicates whether dark mode is currently active.
     */
    Toggle_State: {
        isDarkMode: false,
    },
    
    Functions: {

        /**
         * Applies a CSS property to a list of DOM elements based on the current theme.
         * 
         * @param {string} docElement - The DOM element to apply the style to. 
         * @param {string} propertyName - The name of the CSS property to set .  
         * @param {string} value - The value to assign to the CSS property.
         */
        Set_Element_Property: function(docElement, propertyName, value) {
            docElement.forEach(element => { element.style.setProperty(propertyName, value);})
        },

        /**
         * Updates CSS properties based on the current theme mode.
         *
         * @param {boolean} isDarkMode - Indicates whether dark mode is active.
         */
        Update_Theme: function(isDarkMode) {

            const Theme_Styles = Theme_Handler.Theme_Styles;
            const Functions = Theme_Handler.Functions;

            Theme_Styles.forEach(element => {

                const elementQuery = document.querySelectorAll(element.element);

                element.styles.forEach(style => {

                    Functions.Set_Element_Property(
                        elementQuery,
                        style.style,
                        (isDarkMode) ? style.value.dark : style.value.light
                    );

                });
            });
        },

        /**
         * Creates the Light/Dark mode toggle widget, adds it to the DOM,
         * and attaches event listeners for interactive functionality.
         */
        Create_Widget_UI: function() {

            const Functions = Theme_Handler.Functions;
            
            // Body
            const body = document.body;

            // Container Toggle - Append to 'body' 
            const themeUIContainer = document.createElement('div');
            themeUIContainer.setAttribute('class','theme-ui-container');

            // Toggle - Append to 'themeUIContainer'
            const themeToggleContainer = document.createElement('div');
            themeToggleContainer.setAttribute('class','theme-toggle-container')
            
            // Toggle Indicator - Append to 'themeToggleContainer'
            const themeToggleIndicator = document.createElement('div');
            themeToggleIndicator.setAttribute('class','theme-toggle-indicator')
            
            // Toggle Background - Append to 'themeToggleContainer'
            const themeToggleBackgroundContainer = document.createElement('div')
            themeToggleBackgroundContainer.setAttribute('class','theme-toggle-background-container');

            // Toggle Icons
            const toggleModes = ['dark_mode','light_mode'];
            toggleModes.forEach(mode => {

                const modeIconContainer = document.createElement('div');
                modeIconContainer.setAttribute('class','mode-icon-container');
            
                const modeIcon = document.createElement('i');
                modeIcon.setAttribute('class','material-symbols-outlined');
                modeIcon.id = ((mode === 'dark_mode') ? 'dark-mode' : 'light-mode') + '-icon';
                modeIcon.textContent = mode; 
                
                // Append to 'themeToggleBackgroundContainer'
                modeIconContainer.appendChild(modeIcon);
                themeToggleBackgroundContainer.appendChild(modeIconContainer);

            });

            // Toggle Functionality
            themeToggleContainer.addEventListener('click',function(){
                console.log('working');

                const isDarkMode = Theme_Handler.Toggle_State.isDarkMode;

                // Toggle the dark mode state
                Theme_Handler.Toggle_State.isDarkMode = !Theme_Handler.Toggle_State.isDarkMode;

                const darkIcon  = document.getElementById('dark-mode-icon');
                const lightIcon = document.getElementById('light-mode-icon');

                // Toggle Animation
                if (isDarkMode) {

                    // Toggle Indicator
                    if (!themeToggleIndicator.classList.contains('theme-toggle-indicator-dark'))
                        themeToggleIndicator.classList.add('theme-toggle-indicator-dark');

                    // Toggle Background
                    if (!themeToggleBackgroundContainer.classList.contains('theme-toggle-background-dark'))
                        themeToggleBackgroundContainer.classList.add('theme-toggle-background-dark');

                    // Toggle Dark Mode Icon
                    if (darkIcon.classList.contains('icon-down'))
                        darkIcon.classList.remove('icon-down');

                    // Toggle Light Mode Icon
                    if (!lightIcon.classList.contains('icon-down'))
                        lightIcon.classList.add('icon-down');
                }
                else {

                    // toggle Indicator
                    if (themeToggleIndicator.classList.contains('theme-toggle-indicator-dark'))
                        themeToggleIndicator.classList.remove('theme-toggle-indicator-dark');

                    // Toggle Background
                    if (themeToggleBackgroundContainer.classList.contains('theme-toggle-background-dark'))
                        themeToggleBackgroundContainer.classList.remove('theme-toggle-background-dark');

                    // Toggle Dark Mode Icon
                    if (!darkIcon.classList.contains('icon-down'))
                        darkIcon.classList.add('icon-down');

                    // Toggle Light Mode Icon
                    if (lightIcon.classList.contains('icon-down'))
                        lightIcon.classList.remove('icon-down');

                }

                // Update Template
                Functions.Update_Theme(isDarkMode);
            });

            // Apend to 'themeToggleContainer'
            themeToggleContainer.appendChild(themeToggleIndicator);
            themeToggleContainer.appendChild(themeToggleBackgroundContainer);
            
            themeUIContainer.appendChild(themeToggleContainer);
            body.appendChild(themeUIContainer);
            
        },

        /**
         * Adds css atylesheet and Google icon link to head.
         * Initializes the theme system by creating the toggle UI
         * and applying the current theme mode to the document.
         */
        Initialize: function() {
            const isDarkMode    = Theme_Handler.Toggle_State.isDarkMode;
            const Functions     = Theme_Handler.Functions;
         
            // Add Handler StyleSheet
            const themeHandlerStylesheetLink = document.createElement("link");
            themeHandlerStylesheetLink.rel = "stylesheet";
            themeHandlerStylesheetLink.href = "Theme_Handler/theme_handler_stylesheet.css";
            document.head.appendChild(themeHandlerStylesheetLink);

            // Add Google Icons
            const googleIconLink = document.createElement("link");
            googleIconLink.rel = "stylesheet"
            googleIconLink.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            document.head.appendChild(googleIconLink);

            // Creates Light/Dark mode toggle
            Functions.Create_Widget_UI();

            // Set Theme Mode
            Functions.Update_Theme(isDarkMode); 
        },

    }

}

Theme_Handler.Functions.Initialize();