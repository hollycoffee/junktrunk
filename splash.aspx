<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">
    void Page_Load()
    {
    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Haystak</title>
    <script type="text/javascript" src="http://platform.linkedin.com/in.js">
      api_key: iygeevpxza9t
      scope: r_fullprofile r_network r_emailaddress
      onLoad: onLinkedInLoad
      authorize: true
    </script>

    <script type="text/javascript">
        //Runs when the JavaScript framework is loaded
        function onLinkedInLoad() {

            IN.Event.on(IN, "auth", onLinkedInAuth);
        }

        //Runs when the viewer has authenticated
        function onLinkedInAuth() {

            IN.API.Profile("me")
      .fields("firstName", "lastName")
      .result(displayProfiles)
      .error(displayProfilesErrors);

        }

        //Runs when the Profile() API call returns successfully
        function displayProfiles(profiles) {
            window.location = "appsFrame.html";
        }

        function displayProfilesErrors(error) {
        }

</script>

</head>
<body bgcolor="#336699">
    <form id="splashForm" runat="server">
    <div>
    

        <!-- Placeholder for the greeting -->
        <div id="splashDiv" align="center" style="background-color: #336699">

            <img src="splash_logo.jpg" /><br /><br />

            <script type="in/Login"></script>
        </div>

    </div>
    </form>
</body>
</html>
