<div align="center">
<h1>Cloudflare Pages ☁️ Github Action</h1>
<br />
<p>

A forked copy of the Github action [Cloudflare Pages](https://github.com/cloudflare/pages-action) which is updated to utilize NodeJS 20+ and continues updates.

</p>

<br />

<!-- prettier-ignore-start -->
[![Test Status][badge-tests]][link-tests]
[![Last Commit][badge-commit]][badge-commit]
[![Size][badge-size-gh]][badge-size-gh]
[![All Contributors][badge-all-contributors]](#contributors-)
<!-- prettier-ignore-end -->

</div>

---

<br />

- [About](#about)
- [Usage](#usage)
  - [Get Account ID](#get-account-id)
  - [Generate an API Token](#generate-an-api-token)
  - [Specifying a branch](#specifying-a-branch)
  - [Specifying a working directory](#specifying-a-working-directory)
  - [Wrangler v3](#wrangler-v3)
- [Outputs](#outputs)
- [Examples](#examples)
- [Contributors ✨](#contributors-)


</div>

---

<br />

## About
GitHub Action for creating Cloudflare Pages deployments, using the [Direct Upload](https://developers.cloudflare.com/pages/platform/direct-upload/) feature and [Wrangler](https://developers.cloudflare.com/pages/platform/direct-upload/#wrangler-cli) integration.

<br />

This action was originally found on the official Cloudflare Github page, but the action has lacked updates to more recent libraries.

</div>

---

<br />

## Usage

1. Create an API token within the [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) with the "Cloudflare Pages — Edit" permission.
2. Within the example below, replace `CLOUDFLARE_API_TOKEN` with your given API token.
3. Create a new Github action file `.github/workflows/cfpage-publish.yml` in your repository with the following:

<br />

```yml
run-name: "☁️ CF › Deploy"
name: "☁️ CF › Deploy"

on: [push]

jobs:
  job-publish:
      name: >-
        📦 Publish to Cloudflare
      runs-on: ubuntu-latest
      permissions:
          contents: read
          deployments: write
      steps:

        - name: "☑️ Checkout"
          id: task_publish_checkout
          uses: actions/checkout@v4

        - name: "☁️ Publish to Cloudflare Pages"
          id: task_publish_push
          uses: aetherinox/cloudflare-pages-action@v1
          with:
              apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}       # Cloudflare API Token at https://dash.cloudflare.com/profile/api-tokens
              accountId: ACCOUNT_ID                               # Cloudflare account ID available on right side of CF website
              projectName: PROJECT_NAME                           # Project name assigned at creation. view on workers-and-pages section of CF website
              directory: BUILD_OUTPUT_FOLDER                      # Output directory for built website
              gitHubToken: ${{ secrets.GITHUB_TOKEN }}            # Optional: Enable this if you want to have GitHub Deployments triggered
              branch: main                                        # Branch website published to; by default this will be the branch which triggered this workflow
              workingDirectory: my-site                           # Working directory
              wranglerVersion: '3'                                # Optional: Change the Wrangler version, allows you to point to a specific version or a tag such as `beta`
```

<br />

Replace with following variables with your own:
- `ACCOUNT_ID`
- `PROJECT_NAME`
- `BUILD_OUTPUT_FOLDER`

<br />

### Get Account ID

To find your account ID, log in to the Cloudflare dashboard > select your zone in Account Home > find your account ID in Overview under **API** on the right-side menu. If you have not added a zone, add one by selecting **Add site** . You can purchase a domain from [Cloudflare’s registrar](https://developers.cloudflare.com/registrar/).

If you do not have a zone registered to your account, you can also get your account ID from the `pages.dev` URL. E.g: `https://dash.cloudflare.com/<ACCOUNT_ID>/pages`

<br />

### Generate an API Token

To generate an API token:

1. Log in to the Cloudflare dashboard.
2. Select My Profile from the dropdown menu of your user icon on the top right of your dashboard.
3. Select API Tokens > Create Token.
4. Under Custom Token, select Get started.
5. Name your API Token in the Token name field.
6. Under Permissions, select Account, Cloudflare Pages and Edit:
7. Select Continue to summary > Create Token.

More information can be found on [our guide for making Direct Upload deployments with continous integration](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/#use-github-actions).

<br />

### Specifying a branch

The branch name is used by Cloudflare Pages to determine if the deployment is production or preview. Read more about
[git branch build controls](https://developers.cloudflare.com/pages/platform/branch-build-controls/#branch-build-controls).

If you are in a Git workspace, Wrangler will automatically pull the branch information for you. You can override this
manually by adding the argument `branch: YOUR_BRANCH_NAME`.

<br />

### Specifying a working directory

By default Wrangler will run in the root package directory. If your app lives in a monorepo and you want to run Wrangler from its directory, add `workingDirectory: YOUR_PACKAGE_DIRECTORY`.

<br />

### Wrangler v3

You can use the newly released [Wrangler v3](https://blog.cloudflare.com/wrangler3/) with the `wranglerVersion` property.

```yaml
- name: "☁️ Publish to Cloudflare Pages"
  uses: aetherinox/cloudflare-pages-action@v1
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ACCOUNT_ID
    projectName: PROJECT_NAME
    directory: BUILD_OUTPUT_FOLDER
    wranglerVersion: '3'
```

<br />

---

<br />

## Outputs
This action will return the following outputs:

<br />

| Name          | Description                                         |
| ------------- | --------------------------------------------------- |
| `id`          | The ID of the pages deployment                      |
| `url`         | The URL of the pages deployment                     |
| `alias`       | The alias if it exists otherwise the deployment URL |
| `environment` | The environment that was deployed to                |

<br />

---

<br />

## Examples
A few examples of this Github action are provided below:

<details><summary>Deploy cloudflare pages on push with deploy outputs</summary>

<br />

This example allows you to run the action either manually, or on push for the branches `master` or `main`. It includes input declarations when using `workflow_dispatch`.

<br />

```yml
run-name: "☁️ CF › Deploy"
name: "☁️ CF › Deploy"

on:
  push:
    branches:
      - main
      - master

jobs:
  job-publish:
      name: >-
        📦 Publish to Cloudflare
      runs-on: ubuntu-latest
      permissions:
          contents: read
          deployments: write
      steps:

        - name: "☑️ Checkout"
          id: task_publish_checkout
          uses: actions/checkout@v4

        - name: "☁️ Publish to Cloudflare Pages"
          id: task_publish_push
          uses: aetherinox/cloudflare-pages-action@v1
          with:
              apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
              accountId: ACCOUNT_ID
              projectName: PROJECT_NAME
              directory: BUILD_OUTPUT_FOLDER
              gitHubToken: ${{ secrets.GITHUB_TOKEN }}
              branch: main
              workingDirectory: my-site
              wranglerVersion: '3'

        - name: "📝 Outputs"
          run: |
            echo "ID ........... ${{ steps.task_publish_push.outputs.id }}"
            echo "URL .......... ${{ steps.task_publish_push.outputs.url }}"
            echo "Environment .. ${{ steps.task_publish_push.outputs.environment }}"
            echo "Alias ........ ${{ steps.task_publish_push.outputs.alias }}"

        - name: "📝 Outputs to Summary"
          run: |
              echo "Deployed to ${{ steps.task_publish_push.outputs.url }}" >> $GITHUB_STEP_SUMMARY
```

<details><summary>Run on push + workflow dispatch (with inputs)</summary>

<br />

This example allows you to run the action either manually, or on push for the branches `master` or `main`. It includes input declarations when using `workflow_dispatch`.

<br />

```yml
run-name: "☁️ CF › Deploy"
name: "☁️ CF › Deploy"

on:
  push:
    branches:
      - main
      - master

  workflow_dispatch:
    inputs:
      PROJECT_NAME:
        description:  "Project Name"
        required:     true
        default:      'my-site'
        type:         string

      CLOUDFLARE_ACCOUNT_ID:
        description:  "Cloudflare Account ID"
        required:     true
        default:      'XXXXXXXXXXXXXXXX'
        type:         string

      DIRECTORY_BUILD_OUTPUT:
        description:  "Build Output Dir"
        required:     true
        default:      './'
        type:         string

      DIRECTORY_WORKING:
        description:  "Working Dir"
        required:     true
        default:      './'
        type:         string

      WRANGLER_VERSION:
        description:  "Wrangler Version"
        required:     true
        default:      '3'
        type:         string

      BRANCH:
        description:  'Website Branch'
        required:     true
        default:      'main'
        type:         choice
        options:
        - main
        - master

jobs:
  job-publish:
      name: >-
        📦 Publish to Cloudflare
      runs-on: ubuntu-latest
      permissions:
          contents: read
          deployments: write
      steps:

        - name: "☑️ Checkout"
          id: task_publish_checkout
          uses: actions/checkout@v4

        - name: "☁️ Publish to Cloudflare Pages"
          id: task_publish_push
          uses: aetherinox/cloudflare-pages-action@v1
          with:
              apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
              accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}
              projectName: ${{ inputs.PROJECT_NAME || 'my-site' }}
              directory: ${{ inputs.DIRECTORY_BUILD_OUTPUT || './' }}
              gitHubToken: ${{ secrets.GITHUB_TOKEN }}
              branch: ${{ inputs.BRANCH || 'main' }}
              workingDirectory: ${{ inputs.DIRECTORY_WORKING || './' }}
              wranglerVersion: ${{ inputs.WRANGLER_VERSION || '3' }}
```

<br />

Ensure you change the values above to your own.

</details>

<details><summary>Verify & create project on Cloudflare before push (with inputs)</summary>

<br />

This example adds the usage of the Cloudflare api to first check if your project name actually exists on Cloudflare, creates the project if not, and then pushes to Cloudflare pages.

<br />

```yml
run-name: "☁️ CF › Deploy"
name: "☁️ CF › Deploy"

on:
  push:
    branches:
      - main
      - master

  workflow_dispatch:
    inputs:
      PROJECT_NAME:
        description:  "Project Name"
        required:     true
        default:      'my-site'
        type:         string

      CLOUDFLARE_ACCOUNT_ID:
        description:  "Cloudflare Account ID"
        required:     true
        default:      'XXXXXXXXXXXXXXXX'
        type:         string

      DIRECTORY_BUILD_OUTPUT:
        description:  "Build Output Dir"
        required:     true
        default:      './'
        type:         string

      DIRECTORY_WORKING:
        description:  "Working Dir"
        required:     true
        default:      './'
        type:         string

      WRANGLER_VERSION:
        description:  "Wrangler Version"
        required:     true
        default:      '3'
        type:         string

      BRANCH:
        description:  'Website Branch'
        required:     true
        default:      'main'
        type:         choice
        options:
        - main
        - master

jobs:
  job-publish:
      name: >-
        📦 Publish to Cloudflare
      runs-on: ubuntu-latest
      permissions:
          contents: read
          deployments: write
      steps:

        - name: "☑️ Checkout"
          id: task_publish_checkout
          uses: actions/checkout@v4

        - name: "☁️ CF › Check Project"
          id: task_publish_project_verify
          shell: bash
          id: check-project
          run: |
            check=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ inputs.PROJECT_NAME || 'my-site' }}" \
              -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
              -H "Content-Type:application/json" | jq -r '.success')
            echo "result=$check" >> $GITHUB_OUTPUT

        - name: "☁️ CF › Create Project (if nonexistent)"
          id: task_publish_project_create
          shell: bash
          if: steps.check-project.outputs.result != 'true'
          run: |
            curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}/pages/projects" \
              -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
              -H "Content-Type:application/json" \
              --data '{"name":"${{ inputs.PROJECT_NAME || 'my-site' }}", "production_branch":"${{ inputs.BRANCH || 'main' }}"}'

        - name: "☁️ Publish to Cloudflare Pages"
          id: task_publish_push
          uses: aetherinox/cloudflare-pages-action@v1
          with:
              apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
              accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}
              projectName: ${{ inputs.PROJECT_NAME || 'my-site' }}
              directory: ${{ inputs.DIRECTORY_BUILD_OUTPUT || './' }}
              gitHubToken: ${{ secrets.GITHUB_TOKEN }}
              branch: ${{ inputs.BRANCH || 'main' }}
              workingDirectory: ${{ inputs.DIRECTORY_WORKING || './' }}
              wranglerVersion: ${{ inputs.WRANGLER_VERSION || '3' }}
```


<br />

</details>

<details><summary>Configure node + pre-install wrangler, and push to cloudflare (with inputs)</summary>

<br />

This example adds the usage of the Cloudflare api to first check if your project name actually exists on Cloudflare, creates the project if not, and then pushes to Cloudflare pages.

<br />

```yml
run-name: "☁️ CF › Deploy"
name: "☁️ CF › Deploy"

on:
  push:
    branches:
      - main
      - master

  workflow_dispatch:
    inputs:
      PROJECT_NAME:
        description:  "Project Name"
        required:     true
        default:      'my-site'
        type:         string

      CLOUDFLARE_ACCOUNT_ID:
        description:  "Cloudflare Account ID"
        required:     true
        default:      'XXXXXXXXXXXXXXXX'
        type:         string

      DIRECTORY_BUILD_OUTPUT:
        description:  "Build Output Dir"
        required:     true
        default:      './'
        type:         string

      DIRECTORY_WORKING:
        description:  "Working Dir"
        required:     true
        default:      './'
        type:         string

      WRANGLER_VERSION:
        description:  "Wrangler Version"
        required:     true
        default:      '3'
        type:         string

      BRANCH:
        description:  'Website Branch'
        required:     true
        default:      'main'
        type:         choice
        options:
        - main
        - master

jobs:
  job-publish:
      name: >-
        📦 Publish to Cloudflare
      runs-on: ubuntu-latest
      permissions:
          contents: read
          deployments: write
      steps:

        - name: "☑️ Checkout"
          id: task_publish_checkout
          uses: actions/checkout@v4

        - name: "⚙️ Setup › Node"
          id: task_publish_node_setup
          uses: actions/setup-node@v4
          with:
            node-version: '20.x'

        - name: "📦 NPM › Install Wrangler"
          id: task_publish_npm_install
          run: |
            npm install -g npm@latest
            npm install --global wrangler
          env:
            NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

        - name: "☁️ CF › Check Project"
          id: task_publish_project_verify
          shell: bash
          id: check-project
          run: |
            check=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}/pages/projects/${{ inputs.PROJECT_NAME || 'my-site' }}" \
              -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
              -H "Content-Type:application/json" | jq -r '.success')
            echo "result=$check" >> $GITHUB_OUTPUT

        - name: "☁️ CF › Create Project (if nonexistent)"
          id: task_publish_project_create
          shell: bash
          if: steps.check-project.outputs.result != 'true'
          run: |
            curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}/pages/projects" \
              -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
              -H "Content-Type:application/json" \
              --data '{"name":"${{ inputs.PROJECT_NAME || 'my-site' }}", "production_branch":"${{ inputs.BRANCH || 'main' }}"}'

        - name: "☁️ Publish to Cloudflare Pages"
          id: task_publish_push
          uses: aetherinox/cloudflare-pages-action@v1
          with:
              apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
              accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID || inputs.CLOUDFLARE_ACCOUNT_ID }}
              projectName: ${{ inputs.PROJECT_NAME || 'my-site' }}
              directory: ${{ inputs.DIRECTORY_BUILD_OUTPUT || './' }}
              gitHubToken: ${{ secrets.GITHUB_TOKEN }}
              branch: ${{ inputs.BRANCH || 'main' }}
              workingDirectory: ${{ inputs.DIRECTORY_WORKING || './' }}
              wranglerVersion: ${{ inputs.WRANGLER_VERSION || '3' }}
```

<br />

</details>

<br />

---

<br />

## Contributors ✨
We are always looking for contributors. If you feel that you can provide something useful to this package, then we'd love to review your suggestion. Before submitting your contribution, please review the following resources:

<br />

The following people have helped get this project going:

<div align="center">

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributors][badge-all-contributors]](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://gitlab.com/Aetherinox"><img src="https://avatars.githubusercontent.com/u/118329232?v=4?s=40" width="40px;" alt="Aetherinox"/><br /><sub><b>Aetherinox</b></sub></a><br /><a href="https://github.com/Aetherinox/cloudflare-pages-action?author=Aetherinox" title="Code">💻</a> <a href="#projectManagement-Aetherinox" title="Project Management">📆</a> <a href="#fundingFinding-Aetherinox" title="Funding Finding">🔍</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

</div>

<br />

---

<br />

<!-- prettier-ignore-start -->
<!-- BADGE > GENERAL -->
[link-general-npm]: https://npmjs.com
[link-general-nodejs]: https://nodejs.org
[link-npmtrends]: http://npmtrends.com/@aetherinox/cloudflare-pages-action
<!-- BADGE > VERSION > GITHUB -->
[badge-version-gh]: https://img.shields.io/github/v/tag/aetherinox/cloudflare-pages-action?logo=GitHub&label=Version&color=ba5225
[link-version-gh]: https://github.com/aetherinox/cloudflare-pages-action/releases
<!-- BADGE > VERSION > NPMJS -->
[badge-version-npm]: https://img.shields.io/npm/v/@aetherinox/cloudflare-pages-action?logo=npm&label=Version&color=ba5225
[link-version-npm]: https://npmjs.com/package/@aetherinox/cloudflare-pages-action
<!-- BADGE > LICENSE -->
[badge-license-mit]: https://img.shields.io/badge/MIT-FFF?logo=creativecommons&logoColor=FFFFFF&label=License&color=9d29a0
[link-license-mit]: https://github.com/aetherinox/cloudflare-pages-action/blob/main/LICENSE
<!-- BADGE > BUILD -->
[badge-build]: https://img.shields.io/github/actions/workflow/status/aetherinox/cloudflare-pages-action/release-npm.yml?logo=github&logoColor=FFFFFF&label=Build&color=%23278b30
[link-build]: https://github.com/aetherinox/cloudflare-pages-action/actions/workflows/release-npm.yml
<!-- BADGE > DOWNLOAD COUNT -->
[badge-downloads-gh]: https://img.shields.io/github/downloads/aetherinox/cloudflare-pages-action/total?logo=github&logoColor=FFFFFF&label=Downloads&color=376892
[link-downloads-gh]: https://github.com/aetherinox/cloudflare-pages-action/releases
[badge-downloads-npm]: https://img.shields.io/npm/dw/%40aetherinox%2Fcloudflare-pages-action?logo=npm&&label=Downloads&color=376892
[link-downloads-npm]: https://npmjs.com/package/@aetherinox/cloudflare-pages-action
<!-- BADGE > DOWNLOAD SIZE -->
[badge-size-gh]: https://img.shields.io/github/repo-size/aetherinox/cloudflare-pages-action?logo=github&label=Size&color=59702a
[link-size-gh]: https://github.com/aetherinox/cloudflare-pages-action/releases
[badge-size-npm]: https://img.shields.io/npm/unpacked-size/@aetherinox/cloudflare-pages-action/latest?logo=npm&label=Size&color=59702a
[link-size-npm]: https://npmjs.com/package/@aetherinox/cloudflare-pages-action
<!-- BADGE > COVERAGE -->
[badge-coverage]: https://img.shields.io/codecov/c/github/aetherinox/cloudflare-pages-action?token=MPAVASGIOG&logo=codecov&logoColor=FFFFFF&label=Coverage&color=354b9e
[link-coverage]: https://codecov.io/github/aetherinox/cloudflare-pages-action
<!-- BADGE > ALL CONTRIBUTORS -->
[badge-all-contributors]: https://img.shields.io/github/all-contributors/aetherinox/cloudflare-pages-action?logo=contributorcovenant&color=de1f6f&label=contributors
[link-all-contributors]: https://github.com/all-contributors/all-contributors
[badge-tests]: https://img.shields.io/github/actions/workflow/status/aetherinox/cloudflare-pages-action/npm-tests.yml?logo=github&label=Tests&color=2c6488
[link-tests]: https://github.com/aetherinox/cloudflare-pages-action/actions/workflows/tests.yml
[badge-commit]: https://img.shields.io/github/last-commit/aetherinox/cloudflare-pages-action?logo=conventionalcommits&logoColor=FFFFFF&label=Last%20Commit&color=313131
[link-commit]: https://github.com/aetherinox/cloudflare-pages-action/commits/main/
<!-- prettier-ignore-end -->
