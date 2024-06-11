
app.service('Comman', function () {
	//Experts Talk Start
	this.GetServices = function () {
		return "/umbraco/api/Services/Get";
	}
	this.GetStatsServiceListing = function () {
		return "/umbraco/api/StatsServiceListing/Get";
	}
	this.GetOnlineServices = function () {
		return "/umbraco/api/Services/GetOnlineServices";
	}
	this.GetKhadamatiServices = function () {
		return "/umbraco/api/Services/Get";
	}
	this.GetServiceCenters = function () {
		return "/umbraco/api/Services/GetServiceCenter";
	}

	this.GetStats = function () {
		return "/umbraco/api/Analytics/Get";
	}
	this.GetSearch = function () {
		return "/umbraco/api/Search/Get";
	}
	this.GetOpenData = function () {
		return "/umbraco/api/OpenData/Get";
	}
	this.GetRegulationsData = function () {
		return "/umbraco/api/Regulations/Get";
	}
	this.GetAllFaqData = function () {
		return "/umbraco/api/Faq/Get";
	}
	this.GetAllNews = function () {
		return "/umbraco/api/MediaListing/Get";
	}
	this.AllRegisterItems = function () {
		return "/umbraco/api/CBuaeregister/Get";
	}

	this.CreateZIP = function () {
		return "/umbraco/api/OpenData/CreateZip";
	}
	this.validationtext = function (value) {
		var regex = /^[\0-9a-zA-Z\u0600-\u06FF ]+$/;
		var validated = new RegExp(regex).test(value);
		if (!validated && value !== "") {
			return false;
		}
		else {
			return true;
		}
	}
});