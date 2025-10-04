let currentUserProfile = 'pessoal';
        let profileData = {}; 
        
        const profileSelectionScreen = document.getElementById('profile-selection');
        const personalQuestionnaireScreen = document.getElementById('personal-questionnaire');
        const businessQuestionnaireScreen = document.getElementById('business-questionnaire');
        const dashboardScreen = document.getElementById('dashboard');
        const profileButtons = document.querySelectorAll('.profile-btn');
        const appContainer = document.getElementById('app-container');
        
        const backToSelectionPersonalBtn = document.getElementById('back-to-selection-personal');
        const backToSelectionBusinessBtn = document.getElementById('back-to-selection-business');
        const changeProfileBtn = document.getElementById('change-profile-btn');
        const tabButtons = document.querySelectorAll('.tab-button');

        const personalForm = document.getElementById('personal-form');
        const businessForm = document.getElementById('business-form');

        const currentProfileDisplayEl = document.getElementById('current-profile-display');
        const savedProfileTypeEl = document.getElementById('saved-profile-type');
        const personalDetailsContent = document.getElementById('personal-details-content');
        const businessDetailsContent = document.getElementById('business-details-content');

        const detailAgeGroup = document.getElementById('detail-age-group');
        const detailHealthConditions = document.getElementById('detail-health-conditions');
        const detailExternalRoutine = document.getElementById('detail-external-routine');

        const detailBusinessType = document.getElementById('detail-business-type');
        const detailHasHvac = document.getElementById('detail-has-hvac');
        const detailEmployeeCount = document.getElementById('detail-employee-count');
        
        function switchScreen(screenToShow) {
            appContainer.classList.add('opacity-0');
            setTimeout(() => {
                profileSelectionScreen.classList.add('hidden');
                personalQuestionnaireScreen.classList.add('hidden');
                businessQuestionnaireScreen.classList.add('hidden');
                dashboardScreen.classList.add('hidden');
                
                screenToShow.classList.remove('hidden');
                appContainer.classList.remove('opacity-0');
            }, 300);
        }

        function updateDashboard() {
            const typeDetail = currentUserProfile === 'pessoal' ? 'Pessoal' : 'Empresas';
            currentProfileDisplayEl.textContent = `Perfil Selecionado: ${typeDetail}`;
            savedProfileTypeEl.textContent = typeDetail;
            
            personalDetailsContent.classList.add('hidden');
            businessDetailsContent.classList.add('hidden');

            if (currentUserProfile === 'pessoal') {
                personalDetailsContent.classList.remove('hidden');
                detailAgeGroup.textContent = profileData.age_group || '--';
                const healthConditions = Array.isArray(profileData.health_conditions) ? profileData.health_conditions.join(', ') : profileData.health_conditions;
                detailHealthConditions.textContent = healthConditions || 'Nenhuma';
                detailExternalRoutine.textContent = profileData.external_routine || '--';
                
            } else if (currentUserProfile === 'empresas') {
                businessDetailsContent.classList.remove('hidden');
                detailBusinessType.textContent = profileData.business_type || '--';
                detailHasHvac.textContent = profileData.has_hvac || '--';
                detailEmployeeCount.textContent = profileData.employee_count || '--';
            }
            
            setActiveTab('data-current');
        }

        function setActiveTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabId).classList.remove('hidden');

            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('tab-active');
            });
            document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('tab-active');
        }


        profileButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentUserProfile = button.dataset.profile;
                if (currentUserProfile === 'pessoal') {
                    switchScreen(personalQuestionnaireScreen);
                } else {
                    switchScreen(businessQuestionnaireScreen);
                }
            });
        });

        backToSelectionPersonalBtn.addEventListener('click', () => {
            switchScreen(profileSelectionScreen);
        });
        
        backToSelectionBusinessBtn.addEventListener('click', () => {
            switchScreen(profileSelectionScreen);
        });


        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(personalForm);
            const healthConditionsArray = formData.getAll('health_conditions'); 
            
            profileData = {
                age_group: formData.get('age_group'),
                external_routine: formData.get('external_routine'),
                health_conditions: healthConditionsArray.includes('Nenhuma') ? ['Nenhuma'] : healthConditionsArray
            };

            updateDashboard();
            switchScreen(dashboardScreen);
        });

        businessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(businessForm);
            profileData = Object.fromEntries(formData.entries()); 

            updateDashboard();
            switchScreen(dashboardScreen);
        });
        
        changeProfileBtn.addEventListener('click', () => {
            profileData = {}; 
            switchScreen(profileSelectionScreen);
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                setActiveTab(button.dataset.tab);
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            switchScreen(profileSelectionScreen);
        });