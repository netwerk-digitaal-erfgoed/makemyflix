<template>
  <div class="cta">
    <div class="container">
      <div class="benefits">
        <div class="content">
          <div class="subheader">Recent gelanceerd project</div>
          <div class="header">Door die verbindingen het publiek bereiken met de kernboodschap</div>
        </div>
        <div class="items">
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:format-list-checks"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Check de endpoints</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:pencil-outline"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Personaliseren</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:autorenew"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Genereer je Flix</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <Icon
                icon="mdi:monitor-share"
                width="2em"
                height="2em" />
            </div>
            <div>
              <h3>Bekijk en delen</h3>
              <p>Lorem ipsum dolor sit amet, consect.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="prompt">
        <h2>
          Maak direct<br />
          je eigen flix
        </h2>
        <NuxtLink
          to="/create"
          class="create-btn"
          >START NU</NuxtLink
        >
      </div>
      <div class="footer">
        <div>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <AtomsLogo />
          </a>
        </div>
        <div class="name">HeritageFlix</div>
        <div class="socials">
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:email" />
          </a>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:facebook" />
          </a>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:instagram" />
          </a>
          <a
            href="/"
            rel="noreferrer noopener"
            target="_blank">
            <Icon icon="mdi:phone" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
.cta {
  padding: 0 var(--space-20);
  background-color: var(--secondary-color);
  color: var(--primary-color);

  .container {
    max-width: 100rem; // TODO: use css var?
    margin: 0 auto;
  }

  .benefits {
    padding: var(--space-40) 0 var(--space-20);
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-8);

    .subheader {
      font-size: 1rem;
      color: #dadada; // TODO: use css var
      margin-bottom: var(--space-8);
    }

    .header {
      font-size: var(--space-8);
    }

    .items {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--space-6);

      .icon {
        color: #0a3dfa; // TODO: use css var
      }

      h3 {
        font-size: 40px; // TODO: use css var
        margin-bottom: var(--space-4);
      }

      p {
        font-size: var(--font-size-base);
      }
    }
  }

  .prompt {
    text-align: center;
    padding: var(--space-20) 0;

    h2 {
      font-size: 85px; // TODO: use css var?
      font-weight: var(--font-weight-bold);
    }

    .create-btn {
      display: inline-block;
      background-color: #0a3dfa; // TODO: use css var
      color: var(--primary-color);
      border-radius: var(--space-4);
      padding: var(--space-6) var(--space-8);
      font-size: var(--space-5);
      margin-top: var(--space-16);
    }
  }

  .footer {
    height: var(--space-29);
    display: grid;
    align-items: center;
    grid-template-columns: var(--space-40) 1fr var(--space-40);

    .name {
      text-align: center;
      font-size: var(--font-size-lg);
    }

    .socials {
      display: flex;
      align-items: center;
      gap: var(--space-6);

      a {
        display: block;
        color: var(--primary-color);
      }
    }
  }
}
</style>
