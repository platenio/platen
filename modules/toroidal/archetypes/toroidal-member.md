---
# For more information about the available options for defining a member site,
# see: http://platen.io/schemas/Toroidal/Content/Member/
name: {{ replace .Name "-" " " | title }}
description: |
  A short summary of the member's site
weight: 1 # Replace with desired weight.
ToroidalHomePage: https://member.com # Replace with the member's actual site
---