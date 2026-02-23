import { supabase } from "@/supabaseClient";

const normalizeProject = (project) => {
  if (!project) {
    return null;
  }

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    budgetCeiling: Number(project.budgetCeiling ?? project.budget_ceiling ?? 0),
    currency: project.currency,
    projectType: project.projectType ?? project.project_type,
    startDate: project.startDate ?? project.start_date,
    endDate: project.endDate ?? project.end_date,
    createdAt: project.createdAt ?? project.created_at,
    userId: project.userId ?? project.user_id,
  };
};

export const createProject = async (payload, options = {}) => {
  if (!options.userId && !payload.userId) {
    throw new Error("You must be signed in to create a project.");
  }

  const createdAt = payload.createdAt ?? new Date().toISOString();
  const projectToCreate = {
    ...payload,
    createdAt,
    userId: options.userId ?? payload.userId,
  };

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        name: projectToCreate.name,
        description: projectToCreate.description,
        budget_ceiling: projectToCreate.budgetCeiling,
        currency: projectToCreate.currency,
        project_type: projectToCreate.projectType,
        start_date: projectToCreate.startDate,
        end_date: projectToCreate.endDate,
        created_at: projectToCreate.createdAt,
        user_id: projectToCreate.userId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    data: normalizeProject(data),
    source: "supabase",
  };
};

export const getProjects = async (options = {}) => {
  if (!options.userId) {
    throw new Error("You must be signed in to view projects.");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", options.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return {
    data: (data || []).map(normalizeProject).filter(Boolean),
    source: "supabase",
  };
};

export const getProjectById = async (projectId, options = {}) => {
  if (!options.userId) {
    throw new Error("You must be signed in to view project details.");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("user_id", options.userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return {
        data: null,
        source: "supabase",
      };
    }

    throw error;
  }

  return {
    data: normalizeProject(data),
    source: "supabase",
  };
};
