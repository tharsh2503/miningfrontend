// ========================================
// FOGSAFE DASHBOARD DATA
// ========================================

const fogSafeData = {

    systemStatus: "ONLINE",

    vehicles: [
        {
            id: "V001",
            status: "ACTIVE",
            speed: 32,
            distance: 8.5,
            visibility: 45,
            riskScore: 35,
            riskLevel: "LOW",
            cause: "Normal conditions",
            action: "CONTINUE",
            x: 30,
            y: 30
        },

        {
            id: "V002",
            status: "WARNING",
            speed: 41,
            distance: 5.2,
            visibility: 28,
            riskScore: 72,
            riskLevel: "HIGH",
            cause: "Dense Fog + Obstacle",
            action: "BRAKE",
            x: 60,
            y: 60
        }
    ],

    environment: {
        temperature: 42,
        humidity: 91,
        visibility: 28,
        pm10: 180,
        rain: 65
    },

    alerts: [
        {
            vehicle: "V002",
            riskLevel: "HIGH",
            distance: 5.2,
            speed: 41,
            visibility: 28,
            cause: "Dense Fog + Obstacle",
            action: "BRAKE"
        }
    ]
};


// ========================================
// CALCULATE MAIN DASHBOARD DATA
// ========================================

const totalVehicles = fogSafeData.vehicles.length;

const highestRiskVehicle =
    fogSafeData.vehicles.reduce((highest, vehicle) => {

        return vehicle.riskScore > highest.riskScore
            ? vehicle
            : highest;

    }, fogSafeData.vehicles[0]);

const activeAlerts = fogSafeData.alerts.length;


// ========================================
// SCREEN 1 — DASHBOARD
// ========================================

function loadDashboard() {

    // Vehicle count
    const vehicleCount =
        document.getElementById("vehicleCount");

    if (vehicleCount) {
        vehicleCount.textContent = totalVehicles;
    }


    // Visibility
    const visibility =
        document.getElementById("visibility");

    if (visibility) {
        visibility.textContent =
            fogSafeData.environment.visibility + " m";
    }


    // Risk score
    const riskScore =
        document.getElementById("riskScore");

    if (riskScore) {
        riskScore.textContent =
            highestRiskVehicle.riskScore + "/100";
    }


    // Alert count
    const alerts =
        document.getElementById("alerts");

    if (alerts) {
        alerts.textContent = activeAlerts;
    }


    // System status
    const systemStatus =
        document.getElementById("systemStatus");

    if (systemStatus) {
        systemStatus.textContent =
            "● SYSTEM " + fogSafeData.systemStatus;
    }


    // Main risk level
    const riskLevel =
        document.getElementById("riskLevel");

    if (riskLevel) {
        riskLevel.textContent =
            highestRiskVehicle.riskLevel + " RISK";
    }
}


// ========================================
// SCREEN 2 — LIVE MAP
// ========================================

function loadMap() {

    const map =
        document.getElementById("map");

    // If map doesn't exist, don't do anything
    if (!map) {
        return;
    }


    // Create vehicle markers

    fogSafeData.vehicles.forEach(vehicle => {

        const marker =
            document.createElement("div");

        marker.classList.add("vehicle");

        marker.textContent =
            "🚛 " + vehicle.id;


        // Position marker
        marker.style.left =
            vehicle.x + "%";

        marker.style.top =
            vehicle.y + "%";


        // Click marker
        marker.addEventListener("click", function () {

            showVehicleInfo(vehicle);

        });


        map.appendChild(marker);

    });

}


// ========================================
// VEHICLE INFORMATION POPUP
// ========================================

function showVehicleInfo(vehicle) {

    alert(
        "Vehicle: " + vehicle.id +
        "\nStatus: " + vehicle.status +
        "\nSpeed: " + vehicle.speed + " km/h" +
        "\nDistance: " + vehicle.distance + " m" +
        "\nVisibility: " + vehicle.visibility + " m" +
        "\nRisk Score: " + vehicle.riskScore + "/100"
    );

}


// ========================================
// SCREEN 3 — ALERTS
// ========================================

function loadAlerts() {

    const alertContainer =
        document.getElementById("alertContainer");

    if (!alertContainer) {
        return;
    }


    // Clear existing alerts

    alertContainer.innerHTML = "";


    // Create alert cards

    fogSafeData.alerts.forEach(alertData => {

        const card =
            document.createElement("div");

        card.classList.add("alert-card");


        card.innerHTML = `

            <h2>🔴 ${alertData.riskLevel} RISK</h2>

            <p>
                Vehicle ID:
                <strong>${alertData.vehicle}</strong>
            </p>

            <p>
                Distance:
                <strong>${alertData.distance} m</strong>
            </p>

            <p>
                Speed:
                <strong>${alertData.speed} km/h</strong>
            </p>

            <p>
                Visibility:
                <strong>${alertData.visibility} m</strong>
            </p>

            <p>
                Cause:
                <strong>${alertData.cause}</strong>
            </p>

            <button onclick="takeAction('${alertData.action}')">
                🛑 ${alertData.action}
            </button>

        `;


        alertContainer.appendChild(card);

    });

}


// ========================================
// ALERT ACTION
// ========================================

function takeAction(action) {

    if (action === "BRAKE") {

        alert(
            "⚠ BRAKE COMMAND ACTIVATED"
        );

    } else {

        alert(
            "Action: " + action
        );

    }

}


// ========================================
// RUN FUNCTIONS WHEN PAGE LOADS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    loadDashboard();

    loadMap();

    loadAlerts();

});