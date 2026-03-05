import GeoPattern from 'geopattern'
/**
 * Represents an organization.
 */
export class Organization {

  public raw: any;

  /**
   * Creates an instance of Organization.
   * @param {object} rawOrganization - The raw organization data.
   */
  constructor(rawOrganization: any) {
    /**
     * The raw organization data.
     * @type {object}
     */
    this.raw = rawOrganization
  }

  /**
   * Gets the ID of the organization.
   * @type {string}
   */
  get id() {
    return this.raw.id
  }

  /**
   * Gets the name of the organization.
   * @type {string}
   */
  get name() {
    return this.raw.name
  }

  /**
   * Gets the slug of the organization.
   * @type {string}
   */
  get slug() {
    return this.raw.slug
  }

  /**
   * Checks if the organization is transparent.
   * @type {boolean}
   */
  get isTransparent() {
    return this.raw.transparent
  }

  /**
   * Checks if the organization is in demo mode.
   * @type {boolean}
   */
  get isDemo() {
    return this.raw.demo_mode
  }

  /**
   * Gets the number of users in the organization.
   * @type {number}
   */
  get users() {
    return this.raw.users.length
  }

  /**
   * Checks if the organization accepts donations.
   * @type {boolean}
   */
  get acceptsDonations() {
    return this.raw.donation_link !== null
  }

  /**
   * Gets the branding information of the organization.
   * @type {object}
   * @property {string} logo - The logo of the organization.
   * @property {string} donationHeader - The donation header of the organization.
   * @property {string} backgroundImage - The background image of the organization.
   * @property {string} publicMessage - The public message of the organization.
   */
  get branding() {
    return {
      logo: this.raw.logo,
      donationHeader: this.raw.donation_header,
      backgroundImage:
        this.raw.background_image ||
        GeoPattern.generate(this.raw.name).toDataUri(),
      description: this.raw.description
    }
  }

  /**
   * Gets the tags of the organization.
   * @type {object}
   * @property {string} type - The type of the organization.
   * @property {string} category - The category of the organization.
   * @property {string[]} badges - The badges of the organization.
   */
  get tags() {
    return {
      type: this.raw.category,
      category: 'Coding',
      badges: []
    }
  }

  /**
   * Gets the creation date of the organization.
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.raw.created_at)
  }

  /**
   * Gets the links associated with the organization.
   * @type {object}
   * @property {string} website - The website link of the organization.
   * @property {string} donations - The donation link of the organization (if it accepts donations).
   * @property {string} financials - The financials link of the organization (if it is transparent).
   */
  get links() {
    const links: { website: string; donations?: string; financials?: string } = {
      website: this.raw.website
    }

    if (this.acceptsDonations) links.donations = this.raw.donation_link
    if (this.isTransparent)
      links.financials = `https://hcb.hackclub.com/${this.slug}`

    return links
  }

  /**
   * Gets the location of the organization.
   * @type {object}
   * @property {string} country - The country of the organization.
   * @property {string} continent - The continent of the organization.
   * @property {string} countryCode - The country code of the organization.
   */
  get location() {
    return {
      country: this.raw.location.country,
      continent: this.raw.location.continent,
      countryCode: this.raw.location.country_code
    }
  }

  /**
   * Updates the organization data by making an API call.
   * @returns {Organization} The updated Organization instance.
   */
  async update() {
    const response = await fetch(this.raw.href)
    const json = await response.json()
    this.raw = json

    return this
  }
}